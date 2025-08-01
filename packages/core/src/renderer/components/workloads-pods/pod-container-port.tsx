/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import "./pod-container-port.scss";

import { Button } from "@freelensapp/button";
import { loggerInjectionToken } from "@freelensapp/logger";
import { showErrorNotificationInjectable } from "@freelensapp/notifications";
import { Spinner } from "@freelensapp/spinner";
import { cssNames } from "@freelensapp/utilities";
import { withInjectables } from "@ogre-tools/injectable-react";
import { action, makeObservable, observable, reaction } from "mobx";
import { disposeOnUnmount, observer } from "mobx-react";
import React from "react";
import { predictProtocol } from "../../port-forward";
import aboutPortForwardingInjectable from "../../port-forward/about-port-forwarding.injectable";
import notifyErrorPortForwardingInjectable from "../../port-forward/notify-error-port-forwarding.injectable";
import openPortForwardInjectable from "../../port-forward/open-port-forward.injectable";
import portForwardDialogModelInjectable from "../../port-forward/port-forward-dialog-model/port-forward-dialog-model.injectable";
import portForwardStoreInjectable from "../../port-forward/port-forward-store/port-forward-store.injectable";

import type { ContainerPort, Pod } from "@freelensapp/kube-object";
import type { Logger } from "@freelensapp/logger";
import type { ShowNotification } from "@freelensapp/notifications";

import type { ForwardedPort, PortForwardStore } from "../../port-forward";
import type { OpenPortForward } from "../../port-forward/open-port-forward.injectable";

export interface PodContainerPortProps {
  pod: Pod;
  port: ContainerPort;
}

interface Dependencies {
  portForwardStore: PortForwardStore;
  logger: Logger;
  openPortForwardDialog: (item: ForwardedPort, options: { openInBrowser: boolean; onClose: () => void }) => void;
  aboutPortForwarding: () => void;
  notifyErrorPortForwarding: (message: string) => void;
  openPortForward: OpenPortForward;
  showErrorNotification: ShowNotification;
}

@observer
class NonInjectedPodContainerPort extends React.Component<PodContainerPortProps & Dependencies> {
  @observable waiting = false;
  @observable forwardPort = 0;
  @observable isPortForwarded = false;
  @observable isActive = false;

  constructor(props: PodContainerPortProps & Dependencies) {
    super(props);
    makeObservable(this);
    this.checkExistingPortForwarding();
  }

  componentDidMount() {
    disposeOnUnmount(this, [
      reaction(
        () => this.props.pod,
        () => this.checkExistingPortForwarding(),
      ),
    ]);
  }

  get portForwardStore() {
    return this.props.portForwardStore;
  }

  @action
  async checkExistingPortForwarding() {
    const { pod, port } = this.props;
    let portForward: ForwardedPort | undefined;

    try {
      portForward = await this.portForwardStore.getPortForward({
        kind: "pod",
        name: pod.getName(),
        namespace: pod.getNs(),
        port: port.containerPort,
        forwardPort: this.forwardPort,
      });
    } catch (error) {
      this.isPortForwarded = false;
      this.isActive = false;
    }

    if (!portForward) {
      return;
    }

    this.forwardPort = portForward.forwardPort;
    this.isPortForwarded = true;
    this.isActive = portForward.status === "Active";
  }

  @action
  async portForward() {
    const { pod, port, openPortForward } = this.props;
    let portForward: ForwardedPort = {
      kind: "pod",
      name: pod.getName(),
      namespace: pod.getNs(),
      port: port.containerPort,
      forwardPort: this.forwardPort,
      protocol: predictProtocol(port.name),
      status: "Active",
    };

    this.waiting = true;

    try {
      // determine how many port-forwards already exist
      const { length } = this.portForwardStore.getPortForwards();

      if (!this.isPortForwarded) {
        portForward = await this.portForwardStore.add(portForward);
      } else if (!this.isActive) {
        portForward = await this.portForwardStore.start(portForward);
      }

      if (portForward.status === "Active") {
        openPortForward(portForward);

        // if this is the first port-forward show the about notification
        if (!length) {
          this.props.aboutPortForwarding();
        }
      } else {
        this.props.notifyErrorPortForwarding(
          `Error occurred starting port-forward, the local port may not be available or the ${portForward.kind} ${portForward.name} may not be reachable`,
        );
      }
    } catch (error) {
      this.props.logger.error("[POD-CONTAINER-PORT]:", error, portForward);
    } finally {
      this.checkExistingPortForwarding();
      this.waiting = false;
    }
  }

  @action
  async stopPortForward() {
    const { pod, port, showErrorNotification } = this.props;
    const portForward: ForwardedPort = {
      kind: "pod",
      name: pod.getName(),
      namespace: pod.getNs(),
      port: port.containerPort,
      forwardPort: this.forwardPort,
    };

    this.waiting = true;

    try {
      await this.portForwardStore.remove(portForward);
    } catch (error) {
      showErrorNotification(`Error occurred stopping the port-forward from port ${portForward.forwardPort}.`);
    } finally {
      this.checkExistingPortForwarding();
      this.forwardPort = 0;
      this.waiting = false;
    }
  }

  render() {
    const { pod, port } = this.props;

    const name = port.name ? `${port.name}: ` : "";
    const hostAddr = port.hostPort ? `${port.hostIP ?? "0.0.0.0"}:${port.hostPort} → ` : "";
    const containerPort = `${port.containerPort}/${port.protocol ?? "TCP"}`;
    const text = `${name}${hostAddr}${containerPort}`;

    const portForwardAction = action(async () => {
      if (this.isPortForwarded) {
        await this.stopPortForward();
      } else {
        const portForward: ForwardedPort = {
          kind: "pod",
          name: pod.getName(),
          namespace: pod.getNs(),
          port: port.containerPort,
          forwardPort: this.forwardPort,
          protocol: predictProtocol(port.name),
        };

        this.props.openPortForwardDialog(portForward, {
          openInBrowser: true,
          onClose: () => this.checkExistingPortForwarding(),
        });
      }
    });

    return (
      <div className={cssNames("PodContainerPort", { waiting: this.waiting })}>
        <span title="Open in a browser" onClick={() => this.portForward()}>
          {text}
        </span>
        <Button primary onClick={portForwardAction}>
          {" "}
          {this.isPortForwarded ? (this.isActive ? "Stop/Remove" : "Remove") : "Forward..."}{" "}
        </Button>
        {this.waiting && <Spinner />}
      </div>
    );
  }
}

export const PodContainerPort = withInjectables<Dependencies, PodContainerPortProps>(NonInjectedPodContainerPort, {
  getProps: (di, props) => ({
    ...props,
    portForwardStore: di.inject(portForwardStoreInjectable),
    openPortForwardDialog: di.inject(portForwardDialogModelInjectable).open,
    aboutPortForwarding: di.inject(aboutPortForwardingInjectable),
    notifyErrorPortForwarding: di.inject(notifyErrorPortForwardingInjectable),
    openPortForward: di.inject(openPortForwardInjectable),
    logger: di.inject(loggerInjectionToken),
    showErrorNotification: di.inject(showErrorNotificationInjectable),
  }),
});

/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import {
  storesAndApisCanBeCreatedInjectionToken,
  verticalPodAutoscalerApiInjectable,
} from "@freelensapp/kube-api-specifics";
import { loggerInjectionToken } from "@freelensapp/logger";
import { getInjectable } from "@ogre-tools/injectable";
import assert from "assert";
import { kubeObjectStoreInjectionToken } from "../../../common/k8s-api/api-manager/kube-object-store-token";
import clusterFrameContextForNamespacedResourcesInjectable from "../../cluster-frame-context/for-namespaced-resources.injectable";
import { VerticalPodAutoscalerStore } from "./store";

const verticalPodAutoscalerStoreInjectable = getInjectable({
  id: "vertical-pod-autoscaler-store",
  instantiate: (di) => {
    assert(
      di.inject(storesAndApisCanBeCreatedInjectionToken),
      "verticalPodAutoscalerStore is only available in certain environments",
    );

    const api = di.inject(verticalPodAutoscalerApiInjectable);

    return new VerticalPodAutoscalerStore(
      {
        context: di.inject(clusterFrameContextForNamespacedResourcesInjectable),
        logger: di.inject(loggerInjectionToken),
      },
      api,
    );
  },
  injectionToken: kubeObjectStoreInjectionToken,
});

export default verticalPodAutoscalerStoreInjectable;

# Freelens

<!-- markdownlint-disable MD013 -->

[![Home](https://img.shields.io/badge/%F0%9F%8F%A0-freelens.app-02a7a0)](https://freelens.app)
[![GitHub](https://img.shields.io/github/stars/freelensapp/freelens?style=flat&label=GitHub%20%E2%AD%90&logo=github)](https://github.com/freelensapp/freelens)
[![Discord](https://img.shields.io/badge/dynamic/json?color=blue&label=Discord&style=flat&query=approximate_member_count&url=https%3A%2F%2Fdiscordapp.com%2Fapi%2Finvites%2F%2FNjKZERK95Y%3Fwith_counts%3Dtrue&logo=discord)](https://discord.gg/NjKZERK95Y)
[![Subreddit](https://img.shields.io/reddit/subreddit-subscribers/freelens?style=flat&label=r%2Ffreelens&logo=reddit)](https://www.reddit.com/r/freelens/)
[![license](https://img.shields.io/github/license/freelensapp/freelens.svg)](https://github.com/freelensapp/freelens?tab=MIT-1-ov-file#readme)
[![release](https://img.shields.io/github/v/release/freelensapp/freelens?display_name=tag&sort=semver)](https://github.com/freelensapp/freelens/releases/latest)
[![Homebrew Cask Version](https://img.shields.io/homebrew/cask/v/freelens?label=homebrew)](https://formulae.brew.sh/cask/freelens#default)
[![WinGet Package Version](https://img.shields.io/winget/v/Freelensapp.Freelens)](https://winstall.app/apps/Freelensapp.Freelens)
[![Scoop Package Version](https://img.shields.io/scoop/v/freelens?bucket=extras
)](https://scoop.sh/#/apps?q=freelens&s=1&d=0)
[![Flathub Version](https://img.shields.io/flathub/v/app.freelens.Freelens)](https://flathub.org/apps/app.freelens.Freelens)
[![Snap Store Version](https://img.shields.io/snapcraft/v/freelens/latest/stable)](https://snapcraft.io/freelens)
[![AUR Version](https://img.shields.io/aur/version/freelens-bin)](https://aur.archlinux.org/packages/freelens-bin)
[![NPM Version](https://img.shields.io/npm/v/%40freelensapp%2Fcore)](https://www.npmjs.com/package/@freelensapp/core)
[![Unit tests](https://github.com/freelensapp/freelens/actions/workflows/unit-tests.yaml/badge.svg?branch=main)](https://github.com/freelensapp/freelens/actions/workflows/unit-tests.yaml)
[![Integration tests](https://github.com/freelensapp/freelens/actions/workflows/integration-tests.yaml/badge.svg?branch=main)](https://github.com/freelensapp/freelens/actions/workflows/integration-tests.yaml)
[![Trunk Check](https://github.com/freelensapp/freelens/actions/workflows/trunk-check.yaml/badge.svg?branch=main)](https://github.com/freelensapp/freelens/actions/workflows/trunk-check.yaml)

<!-- markdownlint-enable MD013 -->

[Freelens](https://freelens.app) is a free and open-source user interface
designed for managing Kubernetes clusters. It provides a standalone
application compatible with macOS, Windows, and Linux operating systems,
making it accessible to a wide range of users. The application aims to
simplify the complexities of Kubernetes management by offering an intuitive
and user-friendly interface.

![Screenshot](freelens/build/screenshots/main.png)

## Downloads

See the [releases](https://github.com/freelensapp/freelens/releases) page and
download the right package for your system.

### macOS

macOS 11 or later is required.

Download either the PKG (installer) or DMG (image) package from the
[releases](https://github.com/freelensapp/freelens/releases) page. Both arm64
(M1 chip or newer) and amd64 (Intel) variants are available.

All binary packages are built on macOS 14 and should be compatible with newer
systems.

#### Homebrew

Run the following command:

```sh
brew install --cask freelens
```

### Linux

Linux with GNU C Library 2.34 or later is required. It is provided ie. by
Debian 12, Fedora 35, Mint 21, openSUSE Leap 15.4, Ubuntu 22.04 and by
rolling release distributions like Arch, Manjaro or Tumbleweed.

Download DEB or RPM (package) or AppImage (executable) from the
[releases](https://github.com/freelensapp/freelens/releases) page. Both arm64
(aarch64) and amd64 (x86_64) variants are available.

All binary packages are built on Ubuntu 22.04 and should be compatible with
new systems.

#### AppImage

The Linux AppImage file requires libz.so and libfuse.so.2. You can add them
by running:

```sh
sudo apt install libfuse2 zlib1g-dev
```

Run the application with additional arguments:

<!-- markdownlint-disable MD013 -->
```sh
./Freelens*.AppImage --no-sandbox --ozone-platform-hint=auto --enable-features=WebRTCPipeWireCapturer --enable-features=WaylandWindowDecorations --disable-gpu-compositing
```
<!-- markdownlint-enable MD013 -->

#### Flatpak

The package is available on the
[Flathub](https://flathub.org/apps/app.freelens.Freelens) App Store for
Linux.

Use GNOME Software application or run the following commands:

```sh
flatpak install flathub app.freelens.Freelens
flatpak run app.freelens.Freelens
```

The application is sandboxed. It includes bundled `kubectl` and `helm`
commands and uses the `~/.kube/config` file by default.

Flatpak adds wrappers for the `aws`, `doctl`, `gke-gcloud-auth-plugin`, and
`kubelogin` tools, running them as commands from the host system.

The terminal uses `/bin/sh` by default, but it can be switched to, for
example, `/bin/bash` for a sandboxed environment or `/app/bin/host-spawn` for
a host environment.

#### Snap

The package is available on the [Snap](https://snapcraft.io/freelens) Store
for Linux.

Use App Center application or run the following command:

```sh
snap install freelens --classic
```

#### APT repository

Run the following commands:

<!-- markdownlint-disable MD013 -->

```sh
curl -L https://raw.githubusercontent.com/freelensapp/freelens/refs/heads/main/freelens/build/apt/freelens.asc | sudo tee /etc/apt/keyrings/freelens.asc
curl -L https://raw.githubusercontent.com/freelensapp/freelens/refs/heads/main/freelens/build/apt/freelens.sources | sudo tee /etc/apt/sources.list.d/freelens.sources
sudo apt update
sudo apt install freelens
```

#### Arch User Repository

The package is available on the [Arch User Repository
(AUR)](https://wiki.archlinux.org/title/Arch_User_Repository).

Check the [freelens-bin](https://aur.archlinux.org/packages/freelens-bin)
package page.

### Windows

Windows 10 or later is required.

Download the EXE (NSIS) or MSI installers from the
[releases](https://github.com/freelensapp/freelens/releases) page.

Both the x64 (amd64) and arm64 versions of the Windows binaries are provided.
However, an EXE installer (NSIS) itself is x86 binary only even if it installs
arm64 application and then installs to `C:\Program Files (x86)\Freelens` path
by default.

The version of the MSI package has the last 4th digit always `0` and this is a
limitation of this package format.

#### WinGet

The package is available in
[WinGet](https://winstall.app/apps/Freelensapp.Freelens) Community
[repository](https://github.com/microsoft/winget-pkgs).

Run the following command:

```powershell
winget install Freelensapp.Freelens
```

The `--silent` option is supported to suppress all UI.

The `--scope user` or `--scope machine` option can be used to install it
either to local user directory or to `C:\Program Files`.

WinGet installs the application from EXE installer (NSIS).

#### Scoop

The package is available in the
[Scoop](https://scoop.sh/#/apps?q=freelens&s=1&d=0) command-line installer for
Windows.

Run the following command:

```powershell
scoop bucket add extras
scoop install freelens
```

Scoop uses MSI package to install the application.

## Development

Visit [Development](https://github.com/freelensapp/freelens/wiki/Development)
wiki page to see how to build the application from source.

## Extensions

Anyone can develop extensions for Freelens and many extensions previously used
with Open Lens have already been converted. Visit
[Extensions](https://github.com/freelensapp/freelens/wiki/Extensions) wiki
page to see them and write in the [appropriate
discussion](https://github.com/freelensapp/freelens/discussions/117) if you
also want to propose yours.

## Community

Get updates about Freelens & keep in touch with our community

- Follow us on [LinkedIn](https://www.linkedin.com/company/freelensapp/)
- Join our [Discussions](https://github.com/freelensapp/freelens/discussions)
- Chat on [Discord](https://discord.gg/NjKZERK95Y)
- Read our [Wiki](https://github.com/freelensapp/freelens/wiki)
- Open an [Issue](https://github.com/freelensapp/freelens/issues)

## Contributing

Anyone is welcome to collaborate to advance the Freelens project. Read
[CONTRIBUTING.md](CONTRIBUTING.md) to see how you can help.

![Star History Chart](https://api.star-history.com/svg?repos=freelensapp/freelens&type=Date)

## Expenses and Donations

Anyone can support the Freelens project by making donations to cover
maintenance costs and invest in its development.

For more information, see our dedicated page in our Wiki: [Expenses and
Donations](https://github.com/freelensapp/freelens/wiki/Expenses-and-Donations)

## Core Team

Each member of the core team is focused on specific roles. You can contact us
at any time according to them.

- [Roberto Bandini](https://www.linkedin.com/in/bandiniroberto/) - [@robertobandini](https://github.com/robertobandini) - Founder<br/>
General organization management, relationships, product management, community, marketing, freelens-ai extension
- [Piotr Roszatycki](https://www.linkedin.com/in/piotr.roszatycki) - [@dex4er](https://github.com/dex4er) - Maintainer<br/>
Development direction, architecture and release management, flux-cd extension, freelens-ai extension
- [Mario Offertucci](https://www.linkedin.com/in/mario-offertucci-703113b6/) - [@mariomamo](https://github.com/mariomamo) - Maintainer<br/>
UI, Docs, freelens-ai extension development management
- [Leopoldo Capuano](https://www.linkedin.com/in/leo-capuano/) - [@leo-capvano](https://github.com/leo-capvano) - Maintainer<br/>
GenAI solutions & freelens-ai extension development management

The project is growing very quickly and everyone is welcome!

If you also want to be part of it, visit the wiki page: [We want
you!](https://github.com/freelensapp/freelens/wiki/We-want-you!).

Or contact us at <freelens@freelens.app> for any questions or suggestions!

## License

This repository is a fork of [Open
Lens](https://github.com/lensapp/lens/tree/master), the core of [Lens
Desktop](https://k8slens.dev), with the aim of carrying forward its
open-source version.

Copyright (c) 2024-2025 Freelens Authors.

Copyright (c) 2022 OpenLens Authors.

[MIT License](https://opensource.org/licenses/MIT)

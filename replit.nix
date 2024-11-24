{pkgs}: {
  deps = [
    pkgs.webkit
    pkgs.firefox
    pkgs.xvfb-run
    pkgs.cairo
    pkgs.pango
    pkgs.cups
    pkgs.atk
    pkgs.nspr
    pkgs.nss
    pkgs.glib
    pkgs.libdrm
    pkgs.alsa-lib
    pkgs.dbus
    pkgs.mesa
    pkgs.gtk3
    pkgs.chromium
  ];
}

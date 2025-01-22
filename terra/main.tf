provider "netbox" {
  server_url = "http://netbox.netbox.svc.cluster.local:8080"
  token      = "your_netbox_token"
}

resource "netbox_device" "aja_device" {
  name   = var.device_name
  status = "active"
  role   = "media_device"
  site   = "datacenter1"
  tenant = "media_team"
}

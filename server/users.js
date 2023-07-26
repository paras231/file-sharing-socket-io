const devices = [];

export function addDevice(id, name, room) {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();
  const device = { id, name, room };
  devices.push(device);
  return { device };
}

export function getDevice(id) {
  const device = devices.find((d)=>d.id==id);
  return device;
} 

export function getDevicesInRoom(room){
   return devices.filter((device) => device.room === room);
}
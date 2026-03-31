export type Screen = 'splash' | 'biometric' | 'home' | 'webview' | 'blocked'
export interface Device {
  name:string; model:string; status:'online'|'offline'|'alert';
  location:string; time:string; battery:number; coords:string; network:string;
}
export const DEVICES: Device[] = [
  {name:"iPhone 15 Pro",model:"iPhone",status:"online",location:"Home · Salt Lake City, UT",time:"Now",battery:83,coords:"40.7608° N, 111.8910° W",network:"LTE"},
  {name:'MacBook Pro 16"',model:"MacBook",status:"online",location:"Office · Downtown SLC",time:"2 min ago",battery:61,coords:"40.7683° N, 111.8909° W",network:"Wi-Fi"},
  {name:"AirPods Pro 2",model:"AirPods",status:"alert",location:"Last seen · 47 min ago",time:"47 min ago",battery:22,coords:"40.7580° N, 111.8800° W",network:"Bluetooth"},
  {name:"iPad Air 5",model:"iPad",status:"offline",location:"No location available",time:"3h ago",battery:45,coords:"Unknown",network:"Offline"}
]

export  function assets_path(){
  return process.env["NODE_ENV"] == 'production' ? '/assets/packs' : (`http://localhost:${process.env["port"] ? process.env["port"]: 3000}/assets/packs`)
}
export default {
  assets_path
}
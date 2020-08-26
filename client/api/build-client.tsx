import axios from 'axios'

const BuildClient = ({ req }) => {
  if (typeof window === 'undefined') {
    // we are on the server's side
    return axios.create({
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers,
    })
  } else {
    //We are on clien't side
    return axios.create({
      baseURL: '/',
    })
  }
}

export default BuildClient

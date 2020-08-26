import axios from 'axios'
import type { AppContext } from 'next/app'
import type { NextPageContext } from 'next'

const BuildClient = (ctx: NextPageContext) => {
  console.log(ctx.req)
  if (typeof window === 'undefined') {
    // we are on the server's side
    return axios.create({
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: ctx.req?.headers,
    })
  } else {
    //We are on clien't side
    return axios.create({
      baseURL: '/',
    })
  }
}

export default BuildClient

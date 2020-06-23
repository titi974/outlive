import PathURL from './PathURL';

export abstract class RedirectOtherSee {
  redirect(path: PathURL, ...uri) {
    return { url: `/${PathURL.API}/${path}/${uri.join('/')}` };
  }
}

import AppConsts from "../../../constants/appconst";
import httpClientFactory from './main';

const http  = httpClientFactory.create(AppConsts.remoteServiceBaseUrl);

export default http;

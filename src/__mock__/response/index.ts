import {apiRoutes} from "../../routes.ts";
import login from './login.json';
import autoLogin from './autoLogin.json';
import list from './list.json';
import filterList from './filterList.json';
import analyzeList from './analyzeList.json';
import detail from './detail.json';
import analyzeDetail from './analyzeDetail.json';


export default {
  [apiRoutes.login]: login,
  [apiRoutes.autoLogin]: autoLogin,
  [apiRoutes.list]: list,
  [apiRoutes.filterList]: filterList,
  [apiRoutes.analyzeList]: analyzeList,
  [apiRoutes.detail]: detail,
  [apiRoutes.analyzeDetail]: analyzeDetail,
};
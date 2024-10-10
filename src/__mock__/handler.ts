import { http, HttpResponse } from "msw";
import response from "./response";
import { apiRoutes } from "../routes.ts";

import fs from "fs";
import * as path from "path";
import { API_URL } from "../common/constants/Env.const.ts";

const imagePath = path.resolve(__dirname, "../../public/test.png");
const imageAsBase64 = fs.readFileSync(imagePath, "binary");
export const handlers = [
  ...[
    apiRoutes.analyzeList,
    apiRoutes.detail,
    apiRoutes.analyzeDetail,
    // apiRoutes.downloadImagesList,
    // apiRoutes.downloadExcelsList,
    // apiRoutes.downloadImageDetail,
    // apiRoutes.downloadJpegDetail,
    // apiRoutes.downloadExcelDetail,
  ].map((path) =>
    http.post(`${API_URL}${path}`, () => {
      return HttpResponse.json(response[path], { status: 200 });
    }),
  ),
  http.post(`${API_URL}${apiRoutes.login}`, () => {
    const data = response[apiRoutes.login];

    return HttpResponse.json(data, { status: 200 });
  }),
  http.get(`${API_URL}${apiRoutes.autoLogin}`, () => {
    const data = response[apiRoutes.autoLogin];

    return HttpResponse.json(data, { status: 200 });
  }),
  http.post(`${API_URL}${apiRoutes.list}`, ({ params }) => {
    const data = response[apiRoutes.list];
    const offset = Number(params["offset"]);
    const limit = Number(params["limit"]);
    const list = data
      .get("list")!
      .filter(
        (_: never, index: number) => index >= offset && index < offset + limit,
      );

    return HttpResponse.json(
      { list, lastPage: list.length < limit },
      { status: 200 },
    );
  }),
  http.post(`${API_URL}${apiRoutes.filterList}`, ({ params }) => {
    const data = response[apiRoutes.filterList];
    const offset = Number(params["offset"]);
    const limit = Number(params["limit"]);
    const list = data
      .get("list")!
      .filter(
        (_: never, index: number) => index >= offset && index < offset + limit,
      );

    return HttpResponse.json(
      { list, lastPage: list.length < limit },
      { status: 200 },
    );
  }),
  http.post(`${API_URL}${apiRoutes.downloadImagesList}`, () => {
    const imageData = Buffer.from(imageAsBase64, "binary");

    return HttpResponse.arrayBuffer(imageData, {
      status: 200,
      headers: { "Content-Type": "image/bmp" },
    });
  }),
];

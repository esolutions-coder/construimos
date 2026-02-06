import { MODE } from "./mode";

export function excelSource() {
  if (MODE === "PRODUCTION") {
    return "https://capi.lorem.fun/createExcel";
  }
  if (MODE === "DEV") {
    return "http://localhost:3500/createExcel";
  }
  return "http://localhost:3500/createExcel";
}

export function dataSource() {
  if (MODE === "PRODUCTION") {
    return "https://capi.lorem.fun/graphql";
  }
  if (MODE === "DEV") {
    return "http://localhost:3500/graphql";
  }
  return "http://localhost:3500/graphql";
}

export function imagesSource() {
  if (MODE === "PRODUCTION") {
    return "https://capi.lorem.fun";
  }
  if (MODE === "DEV") {
    return "http://localhost:3500";
  }
  return "http://localhost:3500";
}

export function adminDataSource() {
  if (MODE === "PRODUCTION") {
    return "https://capi.lorem.fun/graphql";
  }
  if (MODE === "DEV") {
    return "http://localhost:3500/graphql";
  }
  return "http://localhost:3500/graphql";
}

export function graphDataSource() {
  if (MODE === "PRODUCTION") {
    return "https://capi.lorem.fun/graphql";
  }
  if (MODE === "DEV") {
    return "http://localhost:3500/graphql";
  }
  return "http://localhost:3500/graphql";
}

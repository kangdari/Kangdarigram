import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:3000",
  // aws ec2 express server
  baseURL: "http://ec2-52-78-147-36.ap-northeast-2.compute.amazonaws.com",
  // load balancer
  // baseURL: "https://www.kangdari.shop",
  // heroku
  // baseURL: "https://kangdarigram-server.herokuapp.com",
});

export enum ApplicationServiceURL {
  Traning = 'http://localhost:3004/api/traning',
  Orders = 'http://localhost:3004/api/orders',
  Auth = 'http://localhost:5000/api/auth',
  Users = 'http://localhost:5000/api/users',
  Notify = 'http://localhost:6000/api/notify',
  Request = 'http://localhost:5000/api/request',
  Comment = 'http://localhost:3004/api/comment',
  Uploads = 'http://localhost:3001/api/files/upload',
  Files = 'http://localhost:3001/api/files',
}

export const HTTP_CLIENT_MAX_REDIRECTS = 5;
export const HTTP_CLIENT_TIMEOUT = 5000;

export enum ApplicationServiceURL {
  Traning = 'http://fitfriends.traning:3004/api/traning',
  Orders = 'http://fitfriends.traning:3004/api/orders',
  Auth = 'http://fitfriends.users:5000/api/auth',
  Users = 'http://fitfriends.users:5000/api/users',
  Notify = 'http://fitfriends.notify:6000/api/notify',
  Request = 'http://fitfriends.users:5000/api/request',
  Comment = 'http://fitfriends.traning:3004/api/comment',
  Uploads = 'http://fitfriends.uploade:3001/api/files/upload',
  Files = 'http://fitfriends.uploade:3001/api/files',
}

export const HTTP_CLIENT_MAX_REDIRECTS = 5;
export const HTTP_CLIENT_TIMEOUT = 5000;

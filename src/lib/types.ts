export type App_Exception = {
  name: string;
  status: number;
  message: string;
  details: {
    errors?: {
      name: string;
      message: string;
      path: string[];
    }[];
  };
};

export type App_Request = {
  url: string;
  method: string;
  baseURL: string;
  headers: any;
  params: any;
  data: any;
};

export type App_User = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
};

export type App_Authenticated_User = {
  jwt: string;
  user: App_User;
};

export type App_Admin = {
  token: string;
  user: {
    id: number;
    email: string;
    lastname: string;
    blocked: boolean;
    isActive: boolean;
    firstname: string;
    createdAt: string;
    updatedAt: string;
    username: string | null;
    preferedLanguage: string | null;
  };
};

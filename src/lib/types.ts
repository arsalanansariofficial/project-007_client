export type T_Validation = {
  name: string;
  message: string;
  path: string[];
};

export type T_Exception = {
  name: string;
  status: number;
  message: string;
  details: {
    errors?: T_Validation[];
  };
};

export type T_Request = {
  path: string;
  method?: string;
  header?: { [key: string]: string };
  body?: { [key: string]: any };
};

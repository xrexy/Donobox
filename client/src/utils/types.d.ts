type LoginUser = {
  email: string;
  password: string;
};

type User = {
  email: string;
  tokens: number;
  userId: string;
};

type NavbarLink = {
  icon: any;
  label: string;
  notifications?: number;
  children?: React.ReactNode[];
};

type NavbarCollection = {
  emoji: string;
  label: string;
};

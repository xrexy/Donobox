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
  path?: string;
};

type NavbarCollection = {
  emoji: string;
  label: string;
};

type SpotlightActionPrimitive = {
  title: string;
  description: string;
  icon: ReactNode;
  path: string;
  group?: string;
  keywords?: string | string[];
};

type Fundraiser = {
  fundraiserId: string;
  createdBy: string;
  createdOn: string;
  title: string;
  content: string;
  raised: number;
};

type FundraiserResponse = {
  isSingular: true;
  data: Fundraiser[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pages: number;
};

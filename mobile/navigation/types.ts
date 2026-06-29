export type RootStackParamList = {
  Cover: undefined;
  Login: undefined;
  Register: undefined;
  Main: undefined;
  CreateListing: undefined;
  Wallet: undefined;
  KYC: undefined;
  EscrowConfirm: { listingId: string };
  OwnerWithdraw: { escrowId?: string };
};

export type ListingsStackParamList = {
  ListingsFeed: undefined;
  ListingDetail: { id: string };
};

export type TabParamList = {
  Home: undefined;
  ListingsTab: undefined;
  Notifications: undefined;
  Leaderboard: undefined;
  Profile: undefined;
};

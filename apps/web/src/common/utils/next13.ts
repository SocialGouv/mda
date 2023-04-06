export interface Next13ServerPageProps<Param extends string = "", SearchParams extends string = ""> {
  params: {
    [T in Param]: string;
  };
  searchParams: {
    [T in SearchParams]: string;
  };
}

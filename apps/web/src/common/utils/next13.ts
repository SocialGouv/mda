export interface Next13ServerPageProps<Param extends string> {
  params: {
    [T in Param]: string;
  };
}

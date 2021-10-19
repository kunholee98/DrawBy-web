import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar, logUserOut } from "../apollo";
import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
const ME_QUERY = gql`
  query me {
    me {
      username
      avatar
    }
  }
`;

function useUser() {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data } = useQuery(ME_QUERY, {
    skip: !hasToken,
  });
  console.log("hasToken");
  console.log(hasToken);
  //   useEffect(() => {
  //     if (data?.me === null) {
  //       logUserOut();
  //     }
  //   }, [data]);
  console.log(data);
  return;
}

export default useUser;

// pages/dashboards/[id].tsx
import { GetStaticPaths, GetStaticProps } from "next";
import { gql } from "@apollo/client";
import client from "../../services/graphql";
import { Box, Spinner } from "@chakra-ui/react";
import { useDashboardData } from "../../hooks/useDashboardData";
import Link from "next/link";

const Dashboard = ({ initialData }: { initialData: any }) => {
  const { data, error, isLoading } = useDashboardData(initialData);

  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading dashboard</div>;

  return (
    <Box>
      <h1>{data.dashboard.title}</h1>
      {/* Render your dashboard components here */}
      <Link href="/">Go to Home Page</Link>
    </Box>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({
    query: gql`
      query GetDashboardIds {
        dashboards {
          id
        }
      }
    `,
  });

  const paths = data.dashboards.map((dashboard: any) => ({
    params: { id: dashboard.id.toString() },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await client.query({
    query: gql`
      query GetDashboard($id: ID!) {
        dashboard(id: $id) {
          id
          title
          // Add other fields as needed
        }
      }
    `,
    variables: { id: params?.id },
  });

  return {
    props: {
      initialData: data,
    },
    revalidate: 10, // Revalidate at most every 10 seconds
  };
};

export default Dashboard;

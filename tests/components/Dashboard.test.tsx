import { render, screen } from "@testing-library/react";
import Dashboard from "../../pages/dashboards/[id]";
import { SWRConfig } from "swr";

jest.mock("../../hooks/useDashboardData", () => ({
  useDashboardData: () => ({
    data: { dashboard: { title: "Test Dashboard" } },
    isLoading: false,
    error: null,
  }),
}));

describe("Dashboard", () => {
  it("renders dashboard title", () => {
    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <Dashboard initialData={null} />
      </SWRConfig>
    );

    expect(screen.getByText("Test Dashboard")).toBeInTheDocument();
  });

  it("shows loading spinner when loading", () => {
    jest.mock("../../hooks/useDashboardData", () => ({
      useDashboardData: () => ({
        data: null,
        isLoading: true,
        error: null,
      }),
    }));

    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <Dashboard initialData={null} />
      </SWRConfig>
    );

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("shows error message when there is an error", () => {
    jest.mock("../../hooks/useDashboardData", () => ({
      useDashboardData: () => ({
        data: null,
        isLoading: false,
        error: new Error("Failed to fetch"),
      }),
    }));

    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <Dashboard initialData={null} />
      </SWRConfig>
    );

    expect(screen.getByText("Error loading dashboard")).toBeInTheDocument();
  });
});

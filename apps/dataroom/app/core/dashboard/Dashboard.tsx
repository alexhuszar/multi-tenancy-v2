"use client";

import { useSearchParams } from "next/navigation";
import { ActionButtons } from "../../components/ActionButtons";
import { FileDropzone } from "../../components/FileDropzone";
import { Search } from "../../components/Search";
import { Loading } from "../../components/Loading";
import { useAuth } from "../auth/AuthContext";

export const Dashboard = () => {
  // const { files, folders, isLoading: isDataLoading } = useDashboardData();
  const { user, isAuthenticated, isLoading } = useAuth();
  const searchParams = useSearchParams();

  console.log("Dashboard render - user:", user, "isAuthenticated:", isAuthenticated, "isLoading:", isLoading);

  const sort = searchParams?.get("sort") || "createdAt-desc";

  return (
    <section className="flex flex-col overflow-auto gap-4 h-full p-4 xl:p-8 relative">
      <div className="mt-1 flex justify-center">
        <Search />
      </div>

      <div className="h-full gap-4 overflow-auto p-4 xl:p-8">
        {isLoading /*&& isDataLoading*/ && <Loading />}

        {isAuthenticated && user && (
          <div className="flex  flex-col gap-4">
            <ActionButtons
              accountId={user?.accountId}
              className="sm:hidden "
            />
            <FileDropzone accountId={user?.accountId} />
          </div>
        )}

        {/* <DataTable folders={folders} files={files} currentSort={sort} /> */}
      </div>
    </section>
  );
};


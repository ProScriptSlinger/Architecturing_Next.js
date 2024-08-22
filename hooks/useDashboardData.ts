import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';

export const useDashboardData = (initialData) => {
    const router = useRouter();
    const { id } = router.query;
    const { data, error } = useSWR(`/api/dashboards/${id}`, fetcher, { initialData });

    return {
        data,
        error,
        isLoading: !error && !data,
    };
};
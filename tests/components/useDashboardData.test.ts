import { renderHook } from '@testing-library/react-hooks';
import { useDashboardData } from './useDashboardData';
import { SWRConfig } from 'swr';
import { fetcher } from '../utils/fetcher';

jest.mock('next/router', () => ({
    useRouter: () => ({
        query: { id: '1' },
    }),
}));

jest.mock('../utils/fetcher');

describe('useDashboardData', () => {
    it('should return data when fetch is successful', async () => {
        fetcher.mockResolvedValueOnce({ dashboard: { title: 'Test Dashboard' } });

        const { result, waitForNextUpdate } = renderHook(() => useDashboardData(null), {
            wrapper: ({ children }) => <SWRConfig value={{ dedupingInterval: 0 }}> { children } </SWRConfig>,
    });

await waitForNextUpdate();

expect(result.current.data).toEqual({ dashboard: { title: 'Test Dashboard' } });
expect(result.current.isLoading).toBe(false);
expect(result.current.error).toBeUndefined();
  });

it('should return error when fetch fails', async () => {
    fetcher.mockRejectedValueOnce(new Error('Failed to fetch'));

    const { result, waitForNextUpdate } = renderHook(() => useDashboardData(null), {
        wrapper: ({ children }) => <SWRConfig value={{ dedupingInterval: 0 }}> { children } </SWRConfig>,
    });

await waitForNextUpdate();

expect(result.current.error).toEqual(new Error('Failed to fetch'));
expect(result.current.isLoading).toBe(false);
expect(result.current.data).toBeUndefined();
  });
});
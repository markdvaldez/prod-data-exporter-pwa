import { getNow, formatToISODate } from '@/runnersQcApp/shared/DateUtils';
import reducer, {
    clearKeepFilters,
    resetFilters,
    setFilters,
    setKeepFilters,
} from '@/services/store/modules/history';

describe('history slice reducer', () => {
  const today = formatToISODate(getNow());
  const defaultFrom = formatToISODate(getNow().minus({ years: 1 }));

  it('should return the initial state', () => {
    const state = reducer(undefined, { type: '' });
    expect(state).toEqual({
      dateFrom: defaultFrom,
      dateTo: today,
      recTypes: [],
      keepFilters: false,
    });
  });

  it('should handle setFilters', () => {
    const action = setFilters({
      dateFrom: '2025-01-01',
      dateTo: '2025-02-02',
      recTypes: ['Vaccine'],
    });
    const state = reducer(undefined, action);
    expect(state.dateFrom).toBe('2025-01-01');
    expect(state.dateTo).toBe('2025-02-02');
    expect(state.recTypes).toEqual(['Vaccine']);
  });

  it('should handle resetFilters', () => {
    const modified = {
      dateFrom: '2020-01-01',
      dateTo: '2020-02-02',
      recTypes: ['A'],
      keepFilters: true,
    };
    const state = reducer(modified as any, resetFilters());
    expect(state).toEqual({
      dateFrom: defaultFrom,
      dateTo: today,
      recTypes: [],
      keepFilters: true,
    });
  });

  it('should handle setKeepFilters', () => {
    const state = reducer(undefined, setKeepFilters());
    expect(state.keepFilters).toBe(true);
  });

  it('should handle clearKeepFilters', () => {
    const state = reducer({ keepFilters: true } as any, clearKeepFilters());
    expect(state.keepFilters).toBe(false);
  });
});

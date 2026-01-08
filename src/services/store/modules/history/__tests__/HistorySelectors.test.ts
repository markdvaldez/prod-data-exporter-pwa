import {
    selectHistoryDateFrom,
    selectHistoryDateTo,
    selectHistoryKeepFilters,
    selectHistoryRecTypes,
} from '@/services/store/modules/history/selectors';

describe('history selectors', () => {
  const mockState = {
    history: {
      dateFrom: '2025-01-01',
      dateTo: '2025-02-02',
      recTypes: ['Vaccine', 'MandatoryPreRaceAndPreWorkVetInspection'],
      keepFilters: true,
    },
  } as any;

  it('selectHistoryDateFrom', () => {
    expect(selectHistoryDateFrom(mockState)).toBe('2025-01-01');
  });

  it('selectHistoryDateTo', () => {
    expect(selectHistoryDateTo(mockState)).toBe('2025-02-02');
  });

  it('selectHistoryRecTypes', () => {
    expect(selectHistoryRecTypes(mockState)).toEqual(['Vaccine', 'MandatoryPreRaceAndPreWorkVetInspection']);
  });

  it('selectHistoryKeepFilters', () => {
    expect(selectHistoryKeepFilters(mockState)).toBe(true);
  });
});

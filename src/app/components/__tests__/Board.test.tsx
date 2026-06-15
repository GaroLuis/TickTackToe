import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Board from '../Board';

jest.mock('@/app/components/OChip', () => ({
  __esModule: true,
  default: (props: any) => <div data-testid="o-chip" />,
  OChipTag: 'O' as const,
}));

jest.mock('@/app/components/XChip', () => ({
  __esModule: true,
  default: (props: any) => <div data-testid="x-chip" />,
  XChipTag: 'X' as const,
}));

describe('Board', () => {
  const mockPlayChip = jest.fn();

  beforeEach(() => {
    mockPlayChip.mockClear();
  });

  it('renders with empty board', () => {
    const chips: (null | 'O' | 'X')[] = Array(9).fill(null);
    const { container } = render(<Board chips={chips} playChip={mockPlayChip} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('calls playChip when an empty position is clicked', () => {
    const chips: (null | 'O' | 'X')[] = Array(9).fill(null);
    const { container } = render(<Board chips={chips} playChip={mockPlayChip} />);

    const emptyMeshes = container.querySelectorAll('mesh');
    expect(emptyMeshes.length).toBeGreaterThanOrEqual(9);

    fireEvent.click(emptyMeshes[4]);
    expect(mockPlayChip).toHaveBeenCalled();
  });
});

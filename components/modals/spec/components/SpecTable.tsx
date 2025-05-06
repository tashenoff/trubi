import React from 'react';
import { Specification, SelectedItem, SpecificationType } from '../types';
import { TABLE_HEADERS, CURRENCY } from '../config';
import { cn } from '../../../../utils/cn';

interface SpecTableProps {
  type: SpecificationType;
  specifications: Specification[];
  selectedItems: SelectedItem[];
  onItemToggle: (itemName: string) => void;
}

export const SpecTable: React.FC<SpecTableProps> = ({
  type,
  specifications,
  selectedItems,
  onItemToggle,
}) => {
  const headers = TABLE_HEADERS[type];

  const renderTableHeaders = () => (
    <tr>
      {headers.map(header => (
        <th
          key={header.key}
          scope="col"
          className={cn(
            'px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider',
            header.key === 'select' && 'w-10 pl-4 pr-2 text-center',
            header.key !== 'name' && header.key !== 'diameter' && 'text-right'
          )}
        >
          {header.srOnly ? (
            <span className="sr-only">{header.label}</span>
          ) : (
            header.label
          )}
        </th>
      ))}
    </tr>
  );

  const renderTableRow = (spec: Specification) => {
    const itemName = spec.name || spec.diameter || '';
    const selectedItem = selectedItems.find(item => item.name === itemName);
    const isSelected = Boolean(selectedItem);
    const isActive = type === 'bends' ? spec.price !== 0 : spec.pricePerMeter !== 0;

    const formatPrice = (price?: number) => {
      if (!price) return '0';
      return price.toLocaleString(CURRENCY.locale) + ' ' + CURRENCY.symbol;
    };

    return (
      <tr
        key={itemName}
        className={cn(
          'border-b hover:bg-gray-50 transition-colors',
          !isActive && 'opacity-50'
        )}
      >
        <td className="w-10 pl-4 pr-2 py-2">
          <div className="flex justify-center">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => isActive && onItemToggle(itemName)}
              disabled={!isActive}
              className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
              aria-label={`Выбрать ${itemName}`}
            />
          </div>
        </td>
        {type === 'bends' ? (
          <>
            <td className="px-4 py-2">{spec.name}</td>
            <td className="px-4 py-2 text-right">{spec.weight}</td>
            <td className="px-4 py-2 text-right">{formatPrice(spec.price)}</td>
          </>
        ) : (
          <>
            <td className="px-4 py-2">{spec.diameter}</td>
            <td className="px-4 py-2 text-right">{spec.weight}</td>
            <td className="px-4 py-2 text-right">{formatPrice(spec.pricePerMeter)}</td>
            <td className="px-4 py-2 text-right">{formatPrice(spec.pricePerton)}</td>
          </>
        )}
      </tr>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full" role="grid">
        <thead className="bg-white sticky top-0">
          {renderTableHeaders()}
        </thead>
        <tbody>
          {specifications.map(renderTableRow)}
        </tbody>
      </table>
    </div>
  );
}; 
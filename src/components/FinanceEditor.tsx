"use client";

import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface RowData {
  id: number;
  category: string;
  amount: number;
}

export default function FinanceEditor({ 
  content, 
  onChange 
}: { 
  content: string; 
  onChange: (val: string) => void;
}) {
  const [data, setData] = useState<RowData[]>([]);

  // Parse initial content
  useEffect(() => {
    try {
      if (content) {
        setData(JSON.parse(content));
      } else {
        setData([
          { id: 1, category: "Rent", amount: 12000 },
          { id: 2, category: "Food", amount: 5000 },
          { id: 3, category: "Entertainment", amount: 2000 },
        ]);
      }
    } catch (e) {
      setData([
        { id: 1, category: "Rent", amount: 12000 },
        { id: 2, category: "Food", amount: 5000 },
        { id: 3, category: "Entertainment", amount: 2000 },
      ]);
    }
  }, [content]);

  const save = (newData: RowData[]) => {
    setData(newData);
    onChange(JSON.stringify(newData));
  };

  const updateRow = (id: number, field: keyof RowData, value: string | number) => {
    const updated = data.map(row => {
      if (row.id === id) {
        return { ...row, [field]: value };
      }
      return row;
    });
    save(updated);
  };

  const addRow = () => {
    const newId = data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1;
    save([...data, { id: newId, category: "New Item", amount: 0 }]);
  };

  const removeRow = (id: number) => {
    save(data.filter(d => d.id !== id));
  };

  const COLORS = ['#6199f5', '#4dba84', '#f09532', '#9b7ff0', '#e07272', '#dddaeb'];

  return (
    <div className="flex-1 flex flex-col md:flex-row gap-8 p-4 md:p-8 bg-[var(--color-cortex-bg)] overflow-y-auto">
      {/* Spreadsheet Side */}
      <div className="flex-1 border border-[var(--color-cortex-border)] rounded-lg bg-[var(--color-cortex-surface)] overflow-hidden flex flex-col">
        <div className="p-4 border-b border-[var(--color-cortex-border)] flex justify-between items-center bg-[var(--color-cortex-elevated)]">
          <h2 className="text-sm font-semibold text-[var(--color-cortex-text)]">Financial Ledger</h2>
          <button 
            onClick={addRow}
            className="text-xs bg-[var(--color-cortex-amberGlow)] text-[var(--color-cortex-amber)] px-3 py-1.5 rounded border border-[var(--color-cortex-amberBorder)] hover:opacity-80 transition"
          >
            + Add Row
          </button>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-[var(--color-cortex-muted)] uppercase border-b border-[var(--color-cortex-border)]">
              <tr>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Amount (₹)</th>
                <th className="px-4 py-3 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id} className="border-b border-[var(--color-cortex-borderHover)] hover:bg-[var(--color-cortex-elevated)]">
                  <td className="px-4 py-2">
                    <input 
                      type="text" 
                      value={row.category}
                      onChange={(e) => updateRow(row.id, 'category', e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-[var(--color-cortex-text)] focus:ring-1 focus:ring-[var(--color-cortex-amber)] rounded px-2 py-1"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input 
                      type="number" 
                      value={row.amount}
                      onChange={(e) => updateRow(row.id, 'amount', Number(e.target.value))}
                      className="w-full bg-transparent border-none outline-none text-[var(--color-cortex-text)] focus:ring-1 focus:ring-[var(--color-cortex-amber)] rounded px-2 py-1"
                    />
                  </td>
                  <td className="px-4 py-2 text-right">
                    <button 
                      onClick={() => removeRow(row.id)}
                      className="text-[var(--color-cortex-muted)] hover:text-[var(--color-cortex-red)] transition"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Visualization Side */}
      <div className="flex-1 border border-[var(--color-cortex-border)] rounded-lg bg-[var(--color-cortex-surface)] p-6 flex flex-col items-center justify-center min-h-[400px]">
        <h3 className="text-sm font-medium text-[var(--color-cortex-muted)] mb-4">Spending Breakdown</h3>
        {data.length > 0 && data.some(d => d.amount > 0) ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="amount"
                nameKey="category"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--color-cortex-elevated)', borderColor: 'var(--color-cortex-border)', color: 'var(--color-cortex-text)' }}
                itemStyle={{ color: 'var(--color-cortex-text)' }}
              />
              <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: 'var(--color-cortex-text)' }}/>
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-[var(--color-cortex-muted)] text-sm">Add data to see chart</div>
        )}
      </div>
    </div>
  );
}

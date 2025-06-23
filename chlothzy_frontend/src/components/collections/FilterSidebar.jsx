import React from 'react';

export default function FilterSidebar({
  categories,
  types,
}) {
  return (
    <aside className="flex w-full">
      <div className="space-y-6 w-full">
        <div className="mr-8 flex-1 border-1 border-gray-300 p-4">
          <h3 className="mb-2 font-semibold">CATEGORIES</h3>
          {categories.map((cat) => (
            <label
              key={cat}
              className="flex items-center space-x-2 text-gray-700"
            >
              <input
                type="checkbox"
                name="category"
                value={cat}
                className="form-checkbox"
              />
              <span className="capitalize">{cat}</span>
            </label>
          ))}
        </div>

        <div className="mr-8 flex-1 border-1 border-gray-300 p-4">
          <h3 className="mb-2 font-semibold">TYPE</h3>
          {types.map((tp) => (
            <label
              key={tp}
              className="flex items-center space-x-2 text-gray-700"
            >
              <input
                type="checkbox"
                name="type"
                value={tp}
                className="form-checkbox"
              />
              <span className="capitalize">{tp}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}

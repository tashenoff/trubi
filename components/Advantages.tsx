import React from 'react';

const advantages = [
  {
    title: "Качество",
    description: "Строгий контроль качества на всех этапах производства",
    icon: "✓"
  },
  {
    title: "Опыт",
    description: "Многолетний опыт в производстве трубной продукции",
    icon: "🏭"
  },
  {
    title: "Сроки",
    description: "Оперативное выполнение заказов любой сложности",
    icon: "⚡"
  }
];

const Advantages = () => {
  return (
    <div id="advantages" className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Наши преимущества
          </h2>
        </div>
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {advantages.map((advantage, index) => (
              <div key={index} className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                  {advantage.icon}
                </div>
                <div className="ml-16">
                  <h3 className="text-lg font-medium text-gray-900">{advantage.title}</h3>
                  <p className="mt-2 text-base text-gray-500">
                    {advantage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advantages; 
import { NextPage } from 'next';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon, TruckIcon, ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';
import Layout from '../components/Layout';
import Breadcrumbs from '../components/Breadcrumbs';

const deliveryRegions = [
  {
    title: 'Алматы',
    description: 'Доставка по городу Алматы',
    details: [
      'Доставка манипулятором',
      'Возможен самовывоз со склада',
      'Наличие договора для юридических лиц обязательно'
    ]
  },
  {
    title: 'Шымкент',
    description: 'Доставка по городу Шымкент',
    details: [
      'Доставка манипулятором',
      'Возможен самовывоз со склада',
      'Наличие договора для юридических лиц обязательно'
    ]
  },
  {
    title: 'Туркестанская область',
    description: 'Доставка по Туркестанской области',
    details: [
      'Доставка через транспортные компании',
      'Отгрузка после заключения договора',
      'Возможна доставка до объекта'
    ]
  },
  {
    title: 'Актау',
    description: 'Доставка в город Актау',
    details: [
      'Доставка через транспортные компании',
      'Отгрузка после заключения договора',
      'Возможна доставка до объекта'
    ]
  },
  {
    title: 'Атырау',
    description: 'Доставка в город Атырау',
    details: [
      'Доставка через транспортные компании',
      'Отгрузка после заключения договора',
      'Возможна доставка до объекта'
    ]
  },
  {
    title: 'Уральск',
    description: 'Доставка в город Уральск',
    details: [
      'Доставка через транспортные компании',
      'Отгрузка после заключения договора',
      'Возможна доставка до объекта'
    ]
  },
  {
    title: 'Усть-Каменогорск',
    description: 'Доставка в город Усть-Каменогорск',
    details: [
      'Доставка через транспортные компании',
      'Отгрузка после заключения договора',
      'Возможна доставка до объекта'
    ]
  },
  {
    title: 'Семей',
    description: 'Доставка в город Семей',
    details: [
      'Доставка через транспортные компании',
      'Отгрузка после заключения договора',
      'Возможна доставка до объекта'
    ]
  },
  {
    title: 'Астана',
    description: 'Доставка в город Астана',
    details: [
      'Доставка манипулятором',
      'Возможен самовывоз со склада',
      'Наличие договора для юридических лиц обязательно'
    ]
  }
];

const DeliveryPage: NextPage = () => {
  const breadcrumbItems = [
    { label: 'Главная', href: '/' },
    { label: 'Доставка' }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbItems} />
        
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Доставка</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Мы осуществляем доставку металлопроката по всему Казахстану. Работаем с юридическими лицами по договору.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center space-x-4 mb-4">
              <TruckIcon className="h-8 w-8 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-900">Способы доставки</h2>
            </div>
            <p className="text-gray-600">
              Доставка осуществляется манипуляторами и через транспортные компании. Для крупных городов доступен самовывоз со склада.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center space-x-4 mb-4">
              <ClockIcon className="h-8 w-8 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-900">Условия доставки</h2>
            </div>
            <p className="text-gray-600">
              Отгрузка товара производится после заключения договора и согласования всех деталей с менеджером.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {deliveryRegions.map((region, index) => (
            <Disclosure key={index}>
              {({ open }) => (
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                  <Disclosure.Button className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-150">
                    <div className="flex items-center space-x-3">
                      <MapPinIcon className="h-5 w-5 text-blue-500" />
                      <span className="text-lg font-medium text-gray-900">{region.title}</span>
                    </div>
                    <ChevronUpIcon
                      className={`${
                        open ? 'transform rotate-180' : ''
                      } w-5 h-5 text-gray-500 transition-transform duration-200`}
                    />
                  </Disclosure.Button>
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel className="px-6 py-4 bg-gray-50">
                      <p className="text-gray-600 mb-3">{region.description}</p>
                      <ul className="space-y-2">
                        {region.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="text-blue-500 mt-1">•</span>
                            <span className="text-gray-700">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </Disclosure.Panel>
                  </Transition>
                </div>
              )}
            </Disclosure>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Важная информация</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start space-x-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Стоимость доставки рассчитывается индивидуально в зависимости от объема заказа и места доставки</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Для расчета стоимости и условий доставки свяжитесь с нашими менеджерами</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Работаем только с юридическими лицами по договору</span>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default DeliveryPage; 
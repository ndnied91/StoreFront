import { Form, useLoaderData, Link } from 'react-router-dom';
import { FormInput, FormSelect, FormRange, FormCheckbox } from './index';

const Filters = () => {
  const { meta, params } = useLoaderData();

  const { search, caterogy, company, order, price, shipping } = params;
  return (
    <Form
      className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4  gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center"
      method="GET"
    >
      {/* SEARCH */}
      <FormInput
        type="search"
        label="search product"
        name="search"
        size="input-sm h-12"
        placeholder={'Search here..'}
        defaultValue={search}
      />

      <FormSelect
        label={'select category'}
        list={meta.categories}
        name="caterogy"
        defaultValue={caterogy}
      />

      <FormSelect
        label={'select company'}
        list={meta.companies}
        name="company"
        defaultValue={company}
      />

      <FormSelect
        label="sort by"
        name="order"
        list={['a-z', 'z-a', 'high', 'low']}
        size="select-sm"
        defaultValue={order}
      />

      <FormRange
        label="select price"
        name="price"
        size="range-sm"
        defaultValue={price}
      />

      <FormCheckbox
        name="shipping"
        label="free shipping"
        size="checkbox-sm"
        defaultValue={shipping}
      />
      {/* BUTTONS */}
      <button type="submit" className="btn btn-primary btn-sm">
        search
      </button>
      <Link to="/products" className="btn btn-accent btn-sm">
        reset
      </Link>
    </Form>
  );
};
export default Filters;

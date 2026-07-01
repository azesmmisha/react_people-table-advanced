import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink/SearchLink';

type Props = {};

type Param = string | number;
type Params = {
  [key: string]: Param[] | Param | null;
};

function getSearchWith(params: Params, search?: string | URLSearchParams) {
  const newParams = new URLSearchParams(search);

  for (const [key, value] of Object.entries(params)) {
    if (value === null) {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      newParams.delete(key);
      value.forEach(item => newParams.append(key, item.toString()));
    } else {
      newParams.set(key, value.toString());
    }
  }

  return newParams.toString();
}

export const PeopleFilters: React.FC<Props> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  function setSearchWith(params: Params) {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  }

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  const toggledCenturies = (century: number) => {
    return centuries.includes(century.toString())
      ? centuries.filter(cent => cent !== century.toString())
      : [...centuries, century].map(String);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={`${sex !== 'm' && sex !== 'f' ? 'is-active' : ''}`}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={`${sex === 'm' ? 'is-active' : ''}`}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={`${sex === 'f' ? 'is-active' : ''}`}
          params={{ sex: 'f' }}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map(century => {
              return (
                // <Link
                //   key={century}
                //   data-cy="century"
                //   className={`button mr-1 ${centuries.includes(century.toString()) ? 'is-info' : ''}`}
                //   to={{
                //     search: getSearchWith(
                //       { centuries: toggledCenturies(century) },
                //       searchParams,
                //     ),
                //   }}
                // >
                //   {century}
                // </Link>
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={`button mr-1 ${centuries.includes(century.toString()) ? 'is-info' : ''}`}
                  params={{ centuries: toggledCenturies(century) }}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            {/* <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to={{
                search: getSearchWith({ centuries: null }, searchParams),
              }}
            >
              All
            </Link> */}
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        {/* <Link
          className="button is-link is-outlined is-fullwidth"
          to={{
            search: getSearchWith(
              { sex: null, centuries: null, query: null },
              searchParams,
            ),
          }}
        >
          Reset all filters
        </Link> */}
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ sex: null, centuries: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};

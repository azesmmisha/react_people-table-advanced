import { Link, useSearchParams } from 'react-router-dom';

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
  const centuries = searchParams.getAll('century') || [];

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
      : [...centuries, century];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={`${sex !== 'm' && sex !== 'f' ? 'is-active' : ''}`}
          to={{ search: getSearchWith({ sex: null }, searchParams) }}
        >
          All
        </Link>
        <Link
          className={`${sex === 'm' ? 'is-active' : ''}`}
          to={{ search: getSearchWith({ sex: 'm' }, searchParams) }}
        >
          Male
        </Link>
        <Link
          className={`${sex === 'f' ? 'is-active' : ''}`}
          to={{ search: getSearchWith({ sex: 'f' }, searchParams) }}
        >
          Female
        </Link>
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
                <Link
                  key={century}
                  data-cy="century"
                  className={`button mr-1 ${centuries.includes(century.toString()) ? 'is-info' : ''}`}
                  to={{
                    search: getSearchWith(
                      { century: toggledCenturies(century) },
                      searchParams,
                    ),
                  }}
                >
                  {century}
                </Link>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to={{
                search: getSearchWith({ century: null }, searchParams),
              }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{
            search: getSearchWith(
              { sex: null, century: null, query: null },
              searchParams,
            ),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};

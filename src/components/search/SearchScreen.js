import React from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../heroes/HeroCard';
import { getHeroesByName } from '../../selectors/getHeroesByName';

//Se esta utilizando la libreria queryString

export const SearchScreen = ({ history }) => {
    const location = useLocation();
    const { q = '' } = queryString.parse(location.search);

    const [valueForm, handleInputChange] = useForm({
        searchtext: q,
    });

    const { searchtext } = valueForm;
    const heroesFiltred = getHeroesByName(searchtext);

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`?q=${searchtext}`);
    };

    heroesFiltred.filter((heroes) => heroes.superhero === searchtext);

    return (
        <div>
            <h1>Search Screen</h1>
            <hr />

            <div className="row">
                <div className="col-5">
                    <h4>Search Form</h4>
                    <hr />

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Find your hero"
                            className="form-control"
                            value={searchtext}
                            onChange={handleInputChange}
                            name="searchtext"
                            autoComplete="off"
                        />
                        <button
                            type="submit"
                            className="btn btn-outline-primary btn-block m-1"
                        >
                            Search
                        </button>
                    </form>
                </div>

                <div className="col-7">
                    <h4>Results</h4>
                    <hr />

                    {
                        (q === "") 
                            && 
                            <div className="alert alert-info">
                                Search a Hero
                            </div>
                    }

                    {
                        (q !== "" && heroesFiltred.length === 0) 
                            && 
                            <div className="alert alert-info">
                                There is not a hero with "{ q }"
                            </div>
                    }
                  

                    {heroesFiltred.map((hero) => (
                        <HeroCard key={hero.id} {...hero} />
                    ))}
                </div>
            </div>
        </div>
    );
};

import { useContext } from "react";
import { GlobalContext } from "../context/APIContext";

const AppHeader = () => {
    const {handleSearch, setFilterTitle, filterTitle} = useContext(GlobalContext)

    return (
        <header>
            <nav className="navbar bg-body-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand text-danger">BOOLFLIX</a>
                    <form className="d-flex" role="search" onSubmit={handleSearch}>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Cerca"
                            value={filterTitle}
                            onChange={(e) => setFilterTitle(e.target.value)}
                        />
                        <button className="btn btn-outline-danger" type="submit">CERCA</button>
                    </form>
                </div>
            </nav>
        </header>
    )
}

export default AppHeader;
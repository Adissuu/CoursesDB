import { useState, useEffect } from "react";
import { listSearch } from "../../actions/course";
import Link from "next/link";


const Search = () => {
    const [values, setValues] = useState({
        search: undefined,
        results: [],
        searched: false,
        message: ''
    });

    const { search, results, searched, message } = values

    const searchSubmit = e => {
        e.preventDefault()
        listSearch({ search }).then(data => {
            setValues({ ...values, results: data, searched: true, message: `${data.length} courses found` })
        })
    }

    const handleChange = e => {
        setValues({ ...values, search: e.target.value, searched: false, results: [] })
    }

    const searchedCourses = (results = []) => {
        return (
            <div className="">
                {message && <p className="text-white">{message}</p>}

                {results.map((course, i) => {
                    return (
                        <div key={i}>
                            <Link className=" text-forest-100 hover:text-forest-200" href={`/courses/${course.slug}`}>
                                {course.title}
                            </Link>
                        </div>
                    );
                })}
            </div>
        )
    }

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <div class={`relative w-56 ${searched ? 'mt-2' : ''}`}>
                <input type="search" onChange={handleChange} class="block w-full p-4 pl-6 text-lg text-forest-100  rounded-lg bg-azur-100 focus:outline-none" placeholder="Search" required />
                <button type="submit" class="text-white absolute right-2.5 bottom-2.5  font-medium rounded-lg text-sm px-4 py-2">
                    <svg class="w-6 h-6 text-forest-100 hover:text-forest-200 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </button>
            </div>
        </form>
    )

    return (
        <div className="">
            {searchForm()}
            {searched && (
                <div className="">
                    {searchedCourses(results)}
                </div>)}
        </div>
    )
}

export default Search;
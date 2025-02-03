import React, { useState, useEffect } from 'react';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { CourseContext } from '../context/CourseContext'
import { Link } from 'react-router-dom';
import Card from './Card'
import { SITE_URL } from '../Auth/Define';

const SearchBar = ({ showSearch, setShowSearch }) => {

    const { courseData } = useContext(CourseContext);

    const [showRecent, setShowRecent] = useState(false);
    const [searchData, setSearchData] = useState('');
    const [recents, setRecents] = useState([]);
    const maxRecents = 5;

    useEffect(() => {
        const getRecent = localStorage.getItem('Recent');
        if (getRecent) {
            setRecents(JSON.parse(getRecent));
        }
    }, []);

    const handleChange = (e) => {
        setSearchData(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowRecent(false);
        if (searchData && !recents.includes(searchData)) {
            let updatedRecents = [searchData, ...recents];
            if (updatedRecents.length > maxRecents) {
                updatedRecents = updatedRecents.slice(0, maxRecents);
            }
            setRecents(updatedRecents);
            localStorage.setItem('Recent', JSON.stringify(updatedRecents));
        }
    };

    const pickRecentSearch = (item) => {
        setSearchData(item);
        setShowRecent(false);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setShowRecent(false);
        }, 200);
    };

    return (
        <>
            {showSearch && (
                <>
                    {/* Backdrop */}
                    <div className="modal-backdrop fade show" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>

                    {/* Modal */}
                    <div className="modal fade bd-example-modal-xl show d-block">
                        <div className="modal-dialog modal-xl mt-0" style={{ maxWidth: '90%' }}>
                            <div className="modal-content">
                                <div className="modal-header flex-column justify-content-between align-items-center">
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-tone"
                                        onClick={() => setShowSearch(false)}
                                    >
                                        Close
                                    </button>
                                    <div className="w-100 mt-2" style={{ position: 'relative' }}>
                                        <form onSubmit={handleSubmit}>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search here..."
                                                value={searchData}
                                                onChange={handleChange}
                                                onFocus={() => recents.length > 0 ? setShowRecent(true) : setShowRecent(false)}
                                                onBlur={handleBlur}
                                            />
                                            <FontAwesomeIcon
                                                className={`btn btn-secondary btn-tone ${!searchData.length > 0 ? "d-none" : ""}`}
                                                style={{
                                                    position: "absolute",
                                                    right: '0',
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    width: '16px',
                                                    height: '16px',
                                                    cursor: 'pointer',
                                                }}
                                                icon={faCircleXmark}
                                                onClick={() => setSearchData('')}
                                            />
                                        </form>
                                        <div
                                            className={`w-100 ${showRecent ? 'd-flex' : 'd-none'} flex-column border rounded`}
                                            style={{
                                                position: 'absolute',
                                                top: '50px',
                                                transition: 'all 0.3s',
                                                zIndex: '1'
                                            }}>

                                            <div class="table-responsive bg-white shadow-lg">
                                                <table class="table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th colSpan={2} className=''>Recent Searches</th>
                                                            <th className='text-right'>
                                                                <FontAwesomeIcon
                                                                    className="btn btn-danger btn-tone"
                                                                    style={{ height: '16px', cursor: 'pointer' }}
                                                                    icon={faCircleXmark}
                                                                    onClick={() => setShowRecent(false)}
                                                                /></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className=''>
                                                        {recents.map((item, index) => (
                                                            <tr key={index} className=''>
                                                                <td
                                                                    colSpan={2}
                                                                    className=''
                                                                    onClick={() => pickRecentSearch(item)}>
                                                                    {item.length > 35 ? item.substring(0, 40) + "..." : item}
                                                                </td>
                                                                <td></td>
                                                            </tr>
                                                        ))}

                                                    </tbody>
                                                </table>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        {
                                            searchData.length > 0 ? (
                                                courseData.filter((item) =>
                                                    item.program_name.toLowerCase().includes(searchData.toLowerCase())
                                                ).length > 0 ? (
                                                    courseData.filter((item) =>
                                                        item.program_name.toLowerCase().includes(searchData.toLowerCase())
                                                    ).map((foundedItems) => (
                                                        <div className="col-sm-12 col-lg-6 col-xl-3">
                                                            <Card
                                                                title={foundedItems.program_name}
                                                                category={foundedItems.category}
                                                                image={`${SITE_URL}new/app/upload/course_img/${foundedItems.img}`}
                                                                date={foundedItems.update_on}
                                                                oPrice={foundedItems.of_price}
                                                                aPrice={foundedItems.ac_price}
                                                            />
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="col-12" style={{ display: 'grid', placeItems: 'center', width: '100%', height: 'calc(100vh - 190px)' }}>
                                                        <div className='text-center'>No courses found matching
                                                            <span style={{ fontWeight: '500' }}> "{searchData}"</span>
                                                        </div>
                                                    </div>
                                                )
                                            ) : (
                                                <div className="col-12" style={{ display: 'grid', placeItems: 'center', width: '100%', height: 'calc(100vh - 190px)' }}>
                                                    <div className='text-center'>
                                                        Type in the searchbox...
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default SearchBar;

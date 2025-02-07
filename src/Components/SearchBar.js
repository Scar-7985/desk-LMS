import React, { useState, useEffect } from 'react';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { CourseContext } from '../context/CourseContext'
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

            {/* ========================================== */}

            {showSearch &&
                <>
                    <div className="modal-backdrop fade show" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>
                    <div className="modal fade bd-example-modal-xxl show d-block">
                        <div className="modal-dialog  modal-dialog-scrollable modal-xl">
                            <div className="modal-content" >
                                <div className="modal-header align-items-center">
                                    <form className='w-100' onSubmit={handleSubmit}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search here..."
                                            value={searchData}
                                            onChange={handleChange}
                                            onFocus={() => recents.length > 0 ? setShowRecent(true) : setShowRecent(false)}
                                            onBlur={handleBlur}
                                        />
                                    </form>
                                    <button type="button" className="close" data-dismiss="modal" onClick={() => setShowSearch(false)}>
                                        <i className="anticon anticon-close"></i>
                                    </button>
                                    <div
                                        className={`w-100 ${showRecent ? 'd-flex' : 'd-none'} flex-column border rounded`}
                                        style={{
                                            position: 'absolute',
                                            left: '0',
                                            top: '70px',
                                            transition: 'all 0.3s',
                                            zIndex: '1'
                                        }}>

                                        <div className="table-responsive bg-white shadow-lg">
                                            <table className="table table-hover mb-0">
                                                <thead>
                                                    <tr>
                                                        <th colSpan={2} className='font-size-15'>Recent Searches</th>
                                                        <th className='text-right'>
                                                            <button type="button" className="btn btn-primary btn-tone btn-sm" onClick={() => setShowRecent(false)}>
                                                                Close
                                                            </button>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className=''>
                                                    {recents.map((item, index) => (
                                                        <tr key={index} className='' style={{ cursor: 'pointer' }}>
                                                            <td
                                                                colSpan={3}
                                                                className='text-primary py-2 border'
                                                                onClick={() => pickRecentSearch(item)}>
                                                                {item.length > 35 ? item.substring(0, 40) + "..." : item}
                                                            </td>
                                                        </tr>
                                                    ))}

                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                </div>
                                {
                                    searchData.length > 0 &&
                                    <div className="modal-body shadow">
                                        <div className="row">
                                            {
                                                searchData.length > 0 ? (
                                                    courseData.filter((item) =>
                                                        item.program_name.toLowerCase().includes(searchData.toLowerCase())
                                                    ).length > 0 ? (
                                                        courseData.filter((item) =>
                                                            item.program_name.toLowerCase().includes(searchData.toLowerCase())
                                                        ).map((foundedItems) => (
                                                            <div className="col-sm-12 col-lg-6 col-xl-4">
                                                                <Card
                                                                    onClick={() => setShowSearch(false)}
                                                                    title={foundedItems.program_name}
                                                                    category={foundedItems.category}
                                                                    image={`${SITE_URL}new/app/upload/course_img/${foundedItems.img}`}
                                                                    date={foundedItems.update_on}
                                                                    oPrice={foundedItems.of_price}
                                                                    aPrice={foundedItems.ac_price}
                                                                    goToLink={`/course-detail/${foundedItems.program_name}`}
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
                                }

                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    );
};

export default SearchBar;

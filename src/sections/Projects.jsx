const Projects = () => {
    return (
        <section className="w-screen h-screen flex flex-col items-center justify-center p-10 pointer-events-none">
            <h2 className="text-8xl font-bold text-gray-800 mb-10 pointer-events-auto">SELECTED WORK</h2>
            <div className="grid grid-cols-2 gap-10 w-full max-w-6xl pointer-events-auto">

                <div className="bg-gray-200 h-64 rounded-lg shadow-lg flex items-center justify-center text-xl font-bold">Project 1</div>
                <div className="bg-gray-200 h-64 rounded-lg shadow-lg flex items-center justify-center text-xl font-bold">Project 2</div>
                <div className="bg-gray-200 h-64 rounded-lg shadow-lg flex items-center justify-center text-xl font-bold">Project 3</div>
                <div className="bg-gray-200 h-64 rounded-lg shadow-lg flex items-center justify-center text-xl font-bold">Project 4</div>
            </div>
        </section>
    );
};

export default Projects;

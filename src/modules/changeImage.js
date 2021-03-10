const changeImage = () => {
    const commandPhoto = document.querySelectorAll('.command__photo');
    commandPhoto.forEach((item) => {
        item.addEventListener('mouseover', (e) => {
            const target = e.target;
            [target.src, target.dataset.img] = [target.dataset.img, target.src];
        });
    });

    commandPhoto.forEach((item) => {
        item.addEventListener('mouseout', (e) => {
            const target = e.target;
            [target.dataset.img, target.src] = [target.src, target.dataset.img];
        });
    });
};

export default changeImage;
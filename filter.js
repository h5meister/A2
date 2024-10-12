 (function(){

    let currentUser = JSON.parse(localStorage.getItem('user') || '{}')
    if (currentUser) {
        document.getElementById('uname').innerText = currentUser && currentUser.username ? ('Hi Welcome ' + currentUser.username) : ''
    }

		let field = document.querySelector('.items');
            let li = Array.from(field.children);

            function FilterProduct(){
                for(let i of li){
                    const name = i.querySelector('strong');
                    const x = name.textContent;
                    i.setAttribute('data-category', x);
                }

                let indicator = document.querySelector('.indicator').children;
                let searchInput = document.getElementById('searchInput');

                this.run = function(){addIndicatorEvent();};

                function addIndicatorEvent(){
                    for(let i = 0; i < indicator.length; i++){
                        indicator[i].onclick = function(){
                            searchInput.value = '';
                            for(let x = 0; x < indicator.length; x++){
                                indicator[x].classList.remove('active');
                            }
                            this.classList.add('active');
                            const displayItems = this.getAttribute('data-filter');

                            for(let z = 0; z < li.length; z++){
                                li[z].style.transform = 'scale(0)';
                                setTimeout(() => {
                                    li[z].style.display = 'none';
                                }, 500);

                                if(li[z].getAttribute('data-category') == displayItems || displayItems == 'all'){
                                    li[z].style.transform = 'scale(1)';
                                    setTimeout(() => {
                                        li[z].style.display = 'block';
                                    }, 500);
                                }
                            }
                        };
                    }
                }
            }


function Brand(){
    let select1 = document.getElementById('select1');
    let ar = [];

    for(let i of li){
        const brand = i.getAttribute('data-category');
        ar.push(i);
    }

    this.run = () => {addEventListener();}

    function addEventListener() {select1.addEventListener('change', filterByBrand);}

    function filterByBrand(){
        const selectedBrand = select1.value;

        if(selectedBrand === 'ALL') {
            resetFilters();
        }else{
            filterItemsByBrand(selectedBrand);
        }
    }

    function resetFilters(){
        for(let i of li) {
            i.style.display = 'block';
            setTimeout(() => {
                i.style.transform = 'scale(1)';
            }, 500);
        }
    }

    function filterItemsByBrand(brand){
        for(let i of li) {
            const itemBrand = i.getAttribute('data-category');

            if(itemBrand === brand){
                i.style.display = 'block';
                setTimeout(() => {
                    i.style.transform = 'scale(1)';
                }, 500);
            } else{
                i.style.transform = 'scale(0)';
                setTimeout(() => {
                    i.style.display = 'none';
                }, 500);
            }
        }
    }
}


		function SortProduct() {
			let select = document.getElementById('select');
			let ar = [];
			for(let i of li){
				const last = i.lastElementChild;
				const x = last.textContent.trim();
				const y = Number(x.substring(1));
				i.setAttribute("data-price", y);
				ar.push(i);
			}
			this.run = ()=>{
				addevent();
			}
			function addevent(){
				select.onchange = sortingValue;
			}
			function sortingValue(){

				if (this.value === 'Default') {
					while (field.firstChild) {field.removeChild(field.firstChild);}
					field.append(...ar);
				}
				if (this.value === 'LowToHigh') {
					SortElem(field, li, true)
				}
				if (this.value === 'HighToLow') {
					SortElem(field, li, false)
				}
			}
			function SortElem(field,li, asc){
				let  dm, sortli;
				dm = asc ? 1 : -1;
				sortli = li.sort((a, b)=>{
					const ax = a.getAttribute('data-price');
					const bx = b.getAttribute('data-price');
					return ax > bx ? (1*dm) : (-1*dm);
				});
				 while (field.firstChild) {field.removeChild(field.firstChild);}
				 field.append(...sortli);
			}
		}



		function SearchProduct() {
                let searchInput = document.getElementById('searchInput');

                this.run = function() {
                    addEventListener();
                };

                function addEventListener() {
                    searchInput.addEventListener('input', filterItems);
                }

                function filterItems() {
                    const searchText = searchInput.value.toLowerCase();

                    for (let i = 0; i < li.length; i++) {
                        const name = li[i].querySelector('span').textContent.toLowerCase();
                        const item = li[i];

                        if (name.includes(searchText) || searchText === '') {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.style.transform = 'scale(1)';
                            }, 100);
                        } else {
                            item.style.transform = 'scale(0)';
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 500);
                        }
                    }
                }
            }

		new FilterProduct().run();
		new SortProduct().run();
		new SearchProduct().run();
		new Brand().run();
	})(); 
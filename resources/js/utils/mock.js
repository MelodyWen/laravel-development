let mock = {};
mock.categories = [
    {
        root_name: 'Basic',
        root_category: {
            boolean: {
                name: 'boolean',
                method: function (rowNum) {
                    /**
                     * Random.boolean( min?, max?, current? )
                     */
                    return Mock.Random.boolean()
                },
            },
            natural: {
                name: 'natural',
                method: function (rowNum) {
                    /**
                     * Random.natural( min?, max? )
                     */
                    return Mock.Random.natural(1, 100)
                },
            },
            integer: {
                name: 'integer',
                method: function (rowNum) {
                    /**
                     * Random.integer( min?, max? )
                     */
                    return Mock.Random.integer(-100, 100)
                },
            },
            float: {
                name: 'float',
                method: function (rowNum) {
                    /**
                     * Random.float( min?, max?, dmin?, dmax? )
                     */
                    return Mock.Random.float(0, 99, 2, 2)
                },
            },
            character: {
                name: 'character',
                method: function (rowNum) {
                    /**
                     * Random.character( pool? )
                     */
                    return Mock.Random.character('lower')
                },
            },
            string: {
                name: 'string',
                method: function (rowNum) {
                    /**
                     * Random.string( pool, length )
                     */
                    return Mock.Random.string('lower', 10)
                },
            },
            range: {
                name: 'range',
                method: function (rowNum) {
                    /**
                     * Random.range( start, stop, step )
                     */
                    rowNum = parseInt(rowNum);

                    rowNum = isNaN(rowNum) ? 0 : rowNum;

                    return Mock.Random.range(1, rowNum + 1)
                },
            },
        }
    }, {
        root_name: 'Date',
        root_category: {
            date: {
                name: 'date',
                method: function (rowNum) {
                    /**
                     * Random.date( format? )
                     */
                    return Mock.Random.date()
                },
            },
            time: {
                name: 'time',
                method: function (rowNum) {
                    /**
                     * Random.time( format )
                     */
                    return Mock.Random.time()
                },
            },
            datetime: {
                name: 'datetime',
                method: function (rowNum) {
                    /**
                     * Random.datetime( format )
                     */
                    return Mock.Random.datetime()
                },
            },
            now: {
                name: 'now',
                method: function (rowNum) {
                    /**
                     * Ranndom.now( unit, format )
                     */
                    return Mock.Random.now()
                },
            },
        }
    }, {
        root_name: 'Image',
        root_category: {
            img: {
                name: 'img',
                method: function (rowNum) {
                    /**
                     * Random.image( size?, background?, foreground?, format?, text? )
                     */
                    return Mock.Random.img('250x250')
                },
            },
            dataImage: {
                name: 'dataImage',
                method: function (rowNum) {
                    /**
                     * Random.dataImage( size?, text? )
                     */
                    return Mock.Random.dataImage('250x250')
                },
            },
        }
    }, {
        root_name: 'Color',
        root_category: {
            color: {
                name: 'color',
                method: function (rowNum) {
                    /**
                     * Random.color()
                     */
                    return Mock.Random.color()
                },
            },
            hex: {
                name: 'hex',
                method: function (rowNum) {
                    /**
                     * Random.hex()
                     */
                    return Mock.Random.hex()
                },
            },
            rgb: {
                name: 'rgb',
                method: function (rowNum) {
                    /**
                     * Random.rgb()
                     */
                    return Mock.Random.rgb()
                },
            },
            rgba: {
                name: 'rgba',
                method: function (rowNum) {
                    /**
                     * Random.rgba()
                     */
                    return Mock.Random.rgba()
                },
            },
            hsl: {
                name: 'hsl',
                method: function (rowNum) {
                    /**
                     * Random.hsl()
                     */
                    return Mock.Random.hsl()
                },
            },
        }
    }, {
        root_name: 'Text',
        root_category: {
            paragraph: {
                name: 'paragraph',
                method: function (rowNum) {
                    /**
                     * Random.paragraph( min?, max? )
                     */
                    return Mock.Random.paragraph(2, 5)
                },
            },
            cparagraph: {
                name: 'cparagraph',
                method: function (rowNum) {
                    /**
                     * Random.cparagraph( min?, max? )
                     */
                    return Mock.Random.cparagraph(2, 5)
                },
            },
            sentence: {
                name: 'sentence',
                method: function (rowNum) {
                    /**
                     * Random.sentence( min, max )
                     */
                    return Mock.Random.sentence()
                },
            },
            csentence: {
                name: 'csentence',
                method: function (rowNum) {
                    /**
                     * Random.csentence( min, max )
                     */
                    return Mock.Random.csentence()
                },
            },
            word: {
                name: 'word',
                method: function (rowNum) {
                    /**
                     * Random.word( min, max )
                     */
                    return Mock.Random.word(2, 10)
                },
            },
            cword: {
                name: 'cword',
                method: function (rowNum) {
                    /**
                     * Random.cword( min, max )
                     */
                    return Mock.Random.cword(2, 10)
                },
            },
            title: {
                name: 'title',
                method: function (rowNum) {
                    /**
                     * Random.title( min, max )
                     */
                    return Mock.Random.title(2, 10)
                },
            },
            ctitle: {
                name: 'ctitle',
                method: function (rowNum) {
                    /**
                     * Random.title( min, max )
                     */
                    return Mock.Random.ctitle(2, 10)
                },
            }
        }
    }, {
        root_name: 'Name',
        root_category: {
            first: {
                name: 'first',
                method: function (rowNum) {
                    /**
                     * Random.first()
                     */
                    return Mock.Random.first()
                },
            },
            last: {
                name: 'last',
                method: function (rowNum) {
                    /**
                     * Random.last()
                     */
                    return Mock.Random.last()
                },
            },
            name: {
                name: 'name',
                method: function (rowNum) {
                    /**
                     * Random.name()
                     */
                    return Mock.Random.name()
                },
            },
            cfirst: {
                name: 'cfirst',
                method: function (rowNum) {
                    /**
                     * Random.cfirst()
                     */
                    return Mock.Random.cfirst()
                },
            },
            clast: {
                name: 'clast',
                method: function (rowNum) {
                    /**
                     * Random.clast()
                     */
                    return Mock.Random.clast()
                },
            },
            cname: {
                name: 'cname',
                method: function (rowNum) {
                    /**
                     * Random.cname()
                     */
                    return Mock.Random.cname()
                },
            },
        }
    }, {
        root_name: 'Web',
        root_category: {
            url: {
                name: 'url',
                method: function (rowNum) {
                    /**
                     * Random.url(protocol,host)
                     */
                    let protocol = 'https';
                    let host = document.domain;

                    return Mock.Random.url(protocol, host)
                },
            },
            domain: {
                name: 'domain',
                method: function (rowNum) {
                    /**
                     * Random.domain()
                     */
                    return Mock.Random.domain()
                },
            },
            protocol: {
                name: 'protocol',
                method: function (rowNum) {
                    /**
                     * Random.protocol()
                     */
                    return Mock.Random.protocol()
                },
            },
            tld: {
                name: 'tld',
                method: function (rowNum) {
                    /**
                     * Random.tld()
                     */
                    return Mock.Random.tld()
                },
            },
            email: {
                name: 'email',
                method: function (rowNum) {
                    /**
                     * Random.email(host)
                     */
                    let host = document.domain;
                    return Mock.Random.email(host)
                },
            },
            ip: {
                name: 'ip',
                method: function (rowNum) {
                    /**
                     * Random.ip()
                     */
                    return Mock.Random.ip()
                },
            },
        }
    }, {
        root_name: 'Address',
        root_category: {
            region: {
                name: 'region',
                method: function (rowNum) {
                    /**
                     * Random.region()
                     */
                    return Mock.Random.region()
                },
            },
            province: {
                name: 'province',
                method: function (rowNum) {
                    /**
                     * Random.province()
                     */
                    return Mock.Random.province()
                },
            },
            city: {
                name: 'city',
                method: function (rowNum) {
                    /**
                     * Random.city()
                     */
                    return Mock.Random.city(false)
                },
            },
            county: {
                name: 'county',
                method: function (rowNum) {
                    /**
                     * Random.county()
                     */
                    return Mock.Random.county(false)
                },
            },
            zip: {
                name: 'zip',
                method: function (rowNum) {
                    /**
                     * Random.zip()
                     */
                    return Mock.Random.zip()
                },
            },
        }
    }, {
        root_name: 'Miscellaneous',
        root_category: {
            guid: {
                name: 'guid',
                method: function (rowNum) {
                    /**
                     * Random.guid()
                     */
                    return Mock.Random.guid()
                },
            },
            id: {
                name: 'id',
                method: function (rowNum) {
                    /**
                     * Random.cname()
                     */
                    return Mock.Random.id()
                },
            },
            increment: {
                name: 'increment',
                method: function (rowNum) {
                    /**
                     * Random.increment()
                     */
                    return Mock.Random.increment(1)
                },
            },
        }
    }, {
        root_name: 'custom',
        root_category: {
            tel: {
                name: 'tel',
                method: function (rowNum) {
                    let prefixArray = ["130", "131", "132", "133", "135", "137", "138", "170", "187", "189"];
                    let i = parseInt(10 * Math.random());
                    let prefix = prefixArray[i];

                    for (let j = 0; j < 8; j++) {
                        prefix = prefix + Math.floor(Math.random() * 10);
                    }

                    return prefix;
                },
            },
            null: {
                name: 'null',
                method: function (rowNum) {
                    return null;
                },
            },
        }
    }
];

let includeKeyword = function (keyword, str) {

    let response = collect(keyword).filter(function (item) {

        return str.indexOf(item) !== -1
    })
    return response.isNotEmpty();
}

mock.autoSelectMockType = function (column) {

    // 1. 索引匹配
    if (column.COLUMN_KEY === 'PRI') {
        return 'range'
    }

    // 2. 关键字匹配
    if (includeKeyword(['title'], column.COLUMN_NAME)) {
        return 'ctitle'
    }

    // 2. 关键字匹配
    if (includeKeyword(['title'], column.COLUMN_NAME)) {
        return 'ctitle'
    }

    if (includeKeyword(['person', 'name'], column.COLUMN_NAME)) {
        return 'cname'
    }

    if (includeKeyword(['tel', 'mobile'], column.COLUMN_NAME)) {
        return 'tel'
    }

    if (includeKeyword(['age'], column.COLUMN_NAME)) {
        return 'natural'
    }
    if (includeKeyword(['create', 'update'], column.COLUMN_NAME)) {
        return 'now'
    }

    // 3. 字段属性匹配
    if (includeKeyword(['timestamp', 'datetime'], column.COLUMN_TYPE)) {
        return 'datetime'
    }
    if (includeKeyword(['date', 'year'], column.COLUMN_TYPE)) {
        return 'date'
    }
    if (includeKeyword(['time'], column.COLUMN_TYPE)) {
        return 'time'
    }

    if (includeKeyword(['char'], column.COLUMN_TYPE)) {
        return 'ctitle'
    }
    if (includeKeyword(['text'], column.COLUMN_TYPE)) {
        return 'cparagraph'
    }

    if (includeKeyword(['int'], column.COLUMN_TYPE)) {
        return 'natural'
    }
    if (includeKeyword(['decimal', ',numeric'], column.COLUMN_TYPE)) {
        return 'float'
    }

    return null
}

mock.getMethodCode = function (typeName) {
    let response = collect(mock.categories).pluck('root_category').reduce(function (array, item) {
        return {...array, ...item}
    });

    response = collect(response).where('name', typeName).first()

    return response ? response.method : ''
}

export default mock
const dbTests={
    "Шкала Бартера":{
        "Перемещения(с кровати на стул и обратно)":{
            "A":{
                "title":"Самостоятельно перемещается с кровати на стул и обратно с использованием минимальной поддержки",
                "value":3
            },
            "Б":{
                "title":"Перемещается под надзором третьего лица, помогающего физически или вербально",
                "value":2
            },
            "В":{
                "title":"Нуждается в существенной физической помощи при перемещениях",
                "value":1
            },
            "Г":{
                "title":"Не в состоянии самостоятельно сесть в кровати и переместиться на стул",
                "value":0
            }
        },
        "Мобильность(в пределах дома и на прогулке)":{
            "A":{
                "title":"Самостоятельно перемещается на расстояние более 50 м (пешком, используя трость или ходунки)",
                "value":3
            },
            "Б":{
                "title":"Перемещается пешком в пределах 50 м с помощью третьего лица Перемещается пешком в пределах 50 м с помощью третьего лица",
                "value":2
            },
            "В":{
                "title":"Самостоятельно перемещается в пределах 50 м в инвалидном кресле-коляске",
                "value":1
            },
            "Г":{
                "title":"Нуждается в постоянной помощи при перемещениях в инвалидном кресле-коляске",
                "value":0
            }
        },
        "Подъем и спуск по лестнице":{
            "A":{
                "title":"Не нуждается в помощи (при этом может использовать вспомогательные приспособления).",
                "value":2
            },
            "Б":{
                "title":"Нуждается в наблюдении или физической поддержке",
                "value":1
            },
            "В":{
                "title":"Самостоятельно перемещается в пределах 50 м в инвалидном кресле-коляске",
                "value":1
            },
            "Г":{
                "title":"Не в состоянии самостоятельно преодолевать лестницу",
                "value":0
            }
        },

    },
    "Риск падений":{
        "Нарушение зрения":{
            "A":{
                "title":"Да",
                "value":1
            },
            "Б":{
                "title":"Нет",
                "value":0
            }
        },
        "Приём снотворных и успокоительных препаратов":{
            "A":{
                "title":"Да",
                "value":1
            },
            "Б":{
                "title":"Нет",
                "value":0
            }
        },
        "Случаи падения в прошлом":{
            "A":{
                "title":"Да",
                "value":1
            },
            "Б":{
                "title":"Нет",
                "value":0
            }
        },
        "Приём препаратов понижающих а/д":{
            "A":{
                "title":"Да","value":1
            },
            "Б":{
                "title":"Нет",
                "value":0
            }
        },
        "Снижение когнитивных функций":{
            "A":{
                "title":"Да",
                "value":1
            },
            "Б":{
                "title":"Нет",
                "value":0
            }
        },
        "Использование вспомогательных устройств для передвижения":{
            "A":{
                "title":"Да",
                "value":1
            },
            "Б":{
                "title":"Нет",
                "value":0
            }
        },
        "Нарушение походки":{
            "A":{
                "title":"Да",
                "value":1
            },
            "Б":{
                "title":"Нет",
                "value":0
            }
        },
        "Нарушение равновесия":{
            "A":{
                "title":"Да",
                "value":1
            },
            "Б":{
                "title":"Нет",
                "value":0
            }
        },
        "Наличие свыше 4-х хронических заболеваний":{
            "A":{
                "title":"Да",
                "value":1
            },
            "Б":{
                "title":"Нет",
                "value":0
            }
        },
        "Слабость нижних конечностей":{
            "A":{
                "title":"Да",
                "value":1
            },
            "Б":{
                "title":"Нет",
                "value":0
            }
        },
        "Недержание мочи/кала":{
            "A":{
                "title":"Да",
                "value":1
            },
            "Б":{
                "title":"Нет",
                "value":0
            }
        },
        "Избыточный вес":{
            "A":{
                "title":"Да",
                "value":1
            },
            "Б":{
                "title":"Нет",
                "value":0
            }
        },
    }
}
const dbDiagnosis={
    "Гастрит":{
        "Action 1":{
            "discription":"Обед",
            "isArticle":true,
            "Article":"Article 1",
            "schedule":["18:30","10:30","11:30"],
            "Periodicity":"everyday"
        },
        "Action 2":{
            "discription":"Ужин",
            "isArticle":false,
            "Article":null,
            "schedule":["21:00","23:30"],
            "Periodicity":"everyday"
        }
    },
    "Астма":{
        "Action 1":{
            "discription":"Ингаляция",
            "isArticle":true,
            "Article":"Article 1",
            "schedule":["18:30","10:30","11:30"],
            "Periodicity":"everyday"
        },
        "Action 2":{
            "discription":"Выпить лекарства",
            "isArticle":false,
            "Article":null,
            "schedule":["14:20","21:00","23:00"],
            "Periodicity":"everyday"
        },
    },
    "Инсульт":{
        "Action 1":{
            "discription":"Делайте массаж, согласованный с врачом",
            "isArticle":true,
            "Article":`<a target="_blank" href="https://onevrologii.ru/insult/massazh-posle-perenesennogo-insulta">Массж после инсульта</a>`,
            "schedule":["10:30","18:30"],
            "Periodicity":"everyday"
        },
        "Action 2":{
            "discription":"Мытьё подопечного",
            "isArticle":false,
            "Article":null,
            "schedule":["20:00"],
            "Periodicity":"everyday"
        },
        "Action 3":{
            "discription":"Выполнить дыхательные упражнения",
            "isArticle":true,
            "Article":`<a target="_blank" href="https://helpinsult.ru/pravilnoe-dyxanie-i-dyxatelnaya-gimnastika.html">Дыхательные упржнения при инсульте</a>`,
            "schedule":["11:00"],
            "Periodicity":"everyday"
        },
        "Action 4":{
            "discription":"Выполнить гимнастику",
            "isArticle":true,
            "Article":`<a target="_blank" href="https://helpinsult.ru/uprazhneniya-gimnastiki.html">Гимнастика при инсульте в кровати и стоя</a>,<a target="_blank" href="https://helpinsult.ru/lfk-posle-insulta.html">Гимнастика при инсульте с мячем</a>`,
            "schedule":["11:30"],
            "Periodicity":"everyday"
        }
    },
    "Деменция":{
        "Action 1":{
            "discription":"Прогулки",
            "isArticle":true,
            "Article":`<a target="_blank" href="https://demenciya.ru/demenciya/trenirovka-mozga-dlya-pozhilyh-s-dementsiej/#i-2">Тренировка мозга для пожилых людей с деменцией</a>`,
            "schedule":["12:30","16:40"],
            "Periodicity":"everyday"
        },
        "Action 2":{
            "discription":"Дискуссии и игры в слова",
            "isArticle":false,
            "Article":null,
            "schedule":["14:20","18:00"],
            "Periodicity":"everyweek"
        },
        "Action 3":{
            "discription":"Рукоделие",
            "isArticle":true,
            "Article":`<a target="_blank" href="https://zen.yandex.ru/media/id/5ccfff2057047600b30341ef/viazanie-otlichnaia-profilaktika-demencii-5d662f1a80879d00ad9cb5ae">Вязание - отличная профилактика деменции</a>`,
            "schedule":["14:20","18:00"],
            "Periodicity":"everyweek"
        },
        "Action 4":{
            "discription":"Завтрак/Обед/Ужин",
            "isArticle":true,
            "Article":`<a target="_blank" href="http://healfoods.ru/pitanie-pri-boleznyah/pitanie-pri-demencii.html">Питание при деменции. Полезные советы</a>`,
            "schedule":["9:00","14:20","18:30"],
            "Periodicity":"everyweek"
        }
    },
    "БАС":{
        "Action 1":{
            "discription":"Дыхательная гимнастика",
            "isArticle":true,
            "Article":`<a target="_blank" href="https://pro-palliativ.ru/library/dyhatelnaya-gimnastika-pri-bas/">Дыхательная гимнастика</a>`,
            "schedule":["8:30","12:30","18:30"],
            "Periodicity":"everyday"
        },
        "Action 2":{
            "discription":"упражнения для улучшения и поддержания костно-мышечной системы",
            "isArticle":true,
            "Article":`<a target="_blank" href="https://lecheniebasnarod.jimdofree.com/лечебная-гимнастика-и-массаж-при-бас/">Лечебная гимнастика и масскаж</a>`,
            "schedule":["8:00"],
            "Periodicity":"everyday"
        },
    },
    "Перелом шейки бедра":{
        "Action 1":{
            "discription":"Дыхательная гимнастика",
            "isArticle":true,
            "Article":`<a target="_blank" href="https://pro-palliativ.ru/library/dyhatelnaya-gimnastika-pri-bas/">Как правильно выполнять дыхательную гимнастику</a>`,
            "schedule":["8:30","9:30","10:30","11:30","12:30","13:30","14:30","15:30","16:30","17:30","18:30","19:30","20:30"],
            "Periodicity":"everyday"
        },
        "Action 2":{
            "discription":"Изменять положение",
            "isArticle":true,
            "Article":`<a target="_blank" href="https://pro-palliativ.ru/blog/profilaktika-i-lechenie-prolezhnej/">Как правильно менять положение больного</a>`,
            "schedule":["8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00"],
            "Periodicity":"everyday"
        },
    }
}
const dbArticlesNames={
    "diagnozes":"Диагнозы",
    "medicaments":"Медикаменты",
    "articles":"Полезные статьи",
    "carepatients":"Уход за тяжело больными",
}
const dbArticles={
    "Диагнозы":{
        "Анорексия и кахексия в паллиативной помощи":"https://pro-palliativ.ru/blog/anoreksiya-i-kaheksiya-v-palliativnoj-pomoshhi-prakticheskie-rekomendatsii-dlya-vrachej/",
        "Гид по гепатитам":"https://pro-palliativ.ru/blog/gid-po-gepatitam/",
        "Туберкулез: пути передачи, симптомы, профилактика":"https://pro-palliativ.ru/blog/tuberkulez-puti-peredachi-simptomy-profilaktika/",
        "Практические рекомендации по лечению запора":"https://pro-palliativ.ru/blog/rukovodstvo-po-lecheniyu-zapora/",
        "Спинальная мыщечная атрофия : что это такое?":"https://pro-palliativ.ru/blog/spinalnaya-myshechnaya-atrofiya-sma-likbez/",
    },
    "Медикаменты":{
        "Тонзилгон":"https://yandex.ru/health/pills/product/tonzilgon-n-836",
        "Диаскинтест":"https://yandex.ru/health/pills/product/diaskintest-28611",
        "Кеторол":"https://yandex.ru/health/pills/product/ketorol-386",
        "Остеогенон":"https://yandex.ru/health/pills/product/osteogenon-630",
        "Гемзар":"https://yandex.ru/health/pills/product/gemzar-179",
    },
    "Полезные статьи":{
        "«Держись», «Я тебя понимаю», «Пришло время» — как не стоит утешать":"https://pro-palliativ.ru/blog/derzhis-ya-tebya-ponimayu-prishlo-vremya-kak-ne-stoit-uteshat/",
        "Горе ожидания абсолютно естественно":"https://pro-palliativ.ru/blog/gore-ozhidaniya-absolyutno-estestvenno/",
        "Памятка: организация безопасного пространства":"https://pro-palliativ.ru/library/pamyatka-organizatsiya-bezopasnogo-prostranstva/",
        "Чувство вины перед умершим близким: как в нем разобраться?":"https://pro-palliativ.ru/blog/chuvstvo-viny-pered-umershim-blizkim-kak-v-nem-razobratsya/",
        "Обезболивание по скорой помощи?":"https://pro-palliativ.ru/blog/obezbolivanie-po-skoroj-pomoshhi/",
    },
    "Уход за тяжело больными":{
        "Уход за трахеостомой":"https://pro-palliativ.ru/blog/uhod-za-traheostomoj/",
        "Уход за больным с переломом шейки бедра":"https://pro-palliativ.ru/blog/uhod-za-bolnym-s-perelomom-shejki-bedra/",
        "Уход за мочевым катетером":"https://pro-palliativ.ru/blog/uhod-za-mochevym-kateterom/",
        "Уход при распаде опухоли: что нужно знать родственникам больного":"https://pro-palliativ.ru/blog/uhod-pri-raspade-opuholi-chto-nuzhno-znat-rodstvennikam-bolnogo/",
        "Уход за ногтями":"https://pro-palliativ.ru/blog/uhod-za-nogtyami/",
    }
}


module.exports.dbDiagnosis = dbDiagnosis;
module.exports.dbTests = dbTests;
module.exports.dbArticles = dbArticles;
module.exports.dbArticlesNames = dbArticlesNames;
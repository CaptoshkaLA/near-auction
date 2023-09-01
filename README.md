To start the server server.py responsible for the machine learning model, you must first install all the necessary libraries.
Server server.py is run by the python command server.py . In case of successful launch, the line should appear in the console: `Running on http://127.0.0.1:5000 `

Предварительная инструкция по сборке аукциона:

1. Регистрируем аккаунт в тестовой среде https://testnet.mynearwallet.com/
2. Переходим cd contracts и устанавливаем near-cli командой npm install near-cli -g.
3. Далее запускаем команду near login. Переходим по ссылке с публичным ключом, которая будет в консоли, авторизуемся в аккаунт NEAR Wallet. После авторизации возвращаемся в консоль, вводим имя аккаунта, который только что авторизовали (e.g. captoshkala.testnet). [Возможно, перед авторизацией нужно будет создать ключи командой near keys captoskala.testnet и привязать их к аккаунту near add_key ed25519:6vhPQ28[....и т.д.] --account captoshkala.testnet , но это не точно]
4. После успешной авторизации собираем проект командой npm run build:release
5. Далее запускаем команду near dev-deploy ./build/release/auction.wasm. После которой получим сообщение в виде <Done deploying to dev-1684073187306-81108309936010>
6. Задаем глобальную переменную командой export CONTRACT=dev-1684073187306-81108309936010
7. Если вы используете WIndows, то команды будут выглядеть следующим образом.
8. Команда для получения списка аукционов: near view %CONTRACT% list_auctions
9. Команда для создания аукциона: near call %CONTRACT% create_auction "{\"lotName\": \"Villa #001\", \"lotImageUrl\": \"https://images.unsplash.com/photo-1512917774080-9991f1c4c750\"}" --accountId captoshkala.testnet
10. Команда для отмены аукциона: near call %CONTRACT% cancel_auction "{\"auctionId\": 0}" --accountId captoshkala.testnet
11. Команда для завершения аукциона: near call %CONTRACT% end_auction "{\"auctionId\": 0}" --accountId captoshkala.testnet --gas=300000000000000

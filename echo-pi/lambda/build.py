main_source = open('main.js', 'r').read()
std_source = open('index.js', 'r').read()

program_source = main_source + std_source

program_file = open('build.js', 'w')
program_file.write(program_source)
program_file.close()
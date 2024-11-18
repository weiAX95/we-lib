#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const quicktype_core_1 = require("quicktype-core");
const commander_1 = require("commander");
const inquirer_1 = __importDefault(require("inquirer"));
const lodash_1 = require("lodash");
const chalk = require('chalk');
const fs = require('fs/promises');
const path = require('path');
// 工具函数：验证文件路径
function validatePath(filePath, type) {
    if (type === 'input') {
        return path.extname(filePath).toLowerCase() === '.json';
    }
    return path.extname(filePath).toLowerCase() === '.ts';
}
// 新增: 从 URL 获取数据
async function fetchDataFromUrl(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return JSON.stringify(data);
    }
    catch (error) {
        throw new Error(`Failed to fetch data from URL: ${error}`);
    }
}
// 生成类型定义
async function generateTypes(inputData, interfaceName, outputPath) {
    try {
        // 验证 JSON 格式
        JSON.parse(inputData);
        // 创建一个新的 InputData 实例
        const input = new quicktype_core_1.InputData();
        // 正确创建和添加 JSON 输入源
        const source = (0, quicktype_core_1.jsonInputForTargetLanguage)("typescript");
        // 添加 JSON 样本
        await source.addSource({
            name: interfaceName,
            samples: [inputData]
        });
        const options = {
            lang: "typescript",
            inputData: input,
            rendererOptions: {
                "just-types": "true",
                "prefer-unions": "true",
                "nice-property-names": "true",
            }
        };
        // 生成类型定义
        const result = await (0, quicktype_core_1.quicktype)(options);
        // 确保输出目录存在
        const outputDir = path.dirname(outputPath);
        await fs.mkdir(outputDir, { recursive: true });
        // 写入文件
        await fs.writeFile(outputPath, result.lines.join('\n'));
        console.log(chalk.green(`✨ Types generated successfully at ${outputPath}`));
    }
    catch (error) {
        if (error instanceof SyntaxError) {
            console.error(chalk.red('❌ Invalid JSON input:'), error.message);
        }
        else {
            console.error(chalk.red('❌ Error generating types:'), error);
        }
        throw error;
    }
}
// 读取 JSON 文件
async function readJsonFile(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        return content;
    }
    catch (error) {
        throw new Error(`Failed to read file: ${error}`);
    }
}
// 加载配置文件
async function loadConfig() {
    try {
        const configPath = path.join(process.cwd(), '.typegeneratorrc');
        const config = await fs.readFile(configPath, 'utf-8');
        return JSON.parse(config);
    }
    catch {
        return {};
    }
}
// CLI 程序
const program = new commander_1.Command();
// 基本信息
program
    .name('type-generator')
    .description('Generate TypeScript types from JSON API responses')
    .version('1.0.0');
// generate 命令
// generate 命令
program
    .command('generate')
    .description('Generate types from JSON data')
    .option('-i, --input <path>', 'Input JSON file path')
    .option('-o, --output <path>', 'Output TypeScript file path')
    .option('-n, --name <name>', 'Interface name')
    .option('-u, --url <url>', 'URL to fetch JSON data')
    .action(async (options) => {
    try {
        const answers = await inquirer_1.default.prompt(getGenerateQuestions(options));
        // 确保输出路径和接口名称存在
        const outputPath = options.output || answers.output;
        if (!outputPath) {
            throw new Error('Output path is required');
        }
        const interfaceName = options.name || answers.name;
        if (!interfaceName) {
            throw new Error('Interface name is required');
        }
        let jsonData;
        if (options.url || answers.url) {
            const url = options.url || answers.url;
            if (!url) {
                throw new Error('URL is required');
            }
            console.log(chalk.blue(`📡 Fetching data from ${url}...`));
            jsonData = await fetchDataFromUrl(url);
        }
        else {
            const inputPath = options.input || answers.input;
            if (!inputPath) {
                throw new Error('Input path is required');
            }
            console.log(chalk.blue('📚 Reading input file...'));
            jsonData = await readJsonFile(inputPath);
        }
        console.log(chalk.blue('🔨 Generating types...'));
        await generateTypes(jsonData, interfaceName, outputPath);
    }
    catch (error) {
        console.error(chalk.red('❌ Error:'), error);
        process.exit(1);
    }
});
// watch 命令
program
    .command('watch')
    .description('Watch JSON file for changes and generate types')
    .option('-i, --input <path>', 'Input JSON file path')
    .option('-o, --output <path>', 'Output TypeScript file path')
    .option('-n, --name <name>', 'Interface name')
    .option('-u, --url <url>', 'URL to fetch JSON data')
    .action(async (options) => {
    try {
        const answers = await inquirer_1.default.prompt(getWatchQuestions(options));
        // 确保必要的值存在
        const outputPath = options.output || answers.output;
        if (!outputPath) {
            throw new Error('Output path is required');
        }
        const interfaceName = options.name || answers.name;
        if (!interfaceName) {
            throw new Error('Interface name is required');
        }
        if (options.url || answers.url) {
            const url = options.url || answers.url;
            if (!url) {
                throw new Error('URL is required');
            }
            const interval = parseInt(answers.interval || '60') * 1000;
            console.log(chalk.blue(`👀 Watching ${url} with ${interval / 1000}s interval...`));
            const pollUrl = async () => {
                try {
                    console.log(chalk.yellow('📡 Fetching data from URL...'));
                    const jsonData = await fetchDataFromUrl(url);
                    await generateTypes(jsonData, interfaceName, outputPath);
                }
                catch (error) {
                    console.error(chalk.red('❌ Error fetching data:'), error);
                }
            };
            // 首次执行
            await pollUrl();
            // 设置定时轮询
            const intervalId = setInterval(pollUrl, interval);
            // 处理程序退出
            process.on('SIGINT', () => {
                clearInterval(intervalId);
                console.log(chalk.blue('\n👋 Stopping URL watch...'));
                process.exit(0);
            });
        }
        else {
            const inputPath = options.input || answers.input;
            if (!inputPath) {
                throw new Error('Input path is required');
            }
            console.log(chalk.blue(`👀 Watching ${inputPath} for changes...`));
            // 使用 debounce 避免频繁更新
            const processChanges = (0, lodash_1.debounce)(async () => {
                try {
                    console.log(chalk.yellow('📝 File changed, regenerating types...'));
                    const jsonData = await readJsonFile(inputPath);
                    await generateTypes(jsonData, interfaceName, outputPath);
                }
                catch (error) {
                    console.error(chalk.red('❌ Error processing file changes:'), error);
                }
            }, 300);
            try {
                const ac = new AbortController();
                const { signal } = ac;
                const watcher = fs.watch(inputPath, { signal });
                for await (const event of watcher) {
                    if (event.eventType === 'change') {
                        await processChanges();
                    }
                }
                process.on('SIGINT', () => {
                    ac.abort();
                    console.log(chalk.blue('\n👋 Stopping watch mode...'));
                    process.exit(0);
                });
            }
            catch (error) {
                if (error instanceof Error && error.name === 'AbortError') {
                    console.log(chalk.blue('Watch mode stopped.'));
                }
                else {
                    console.error(chalk.red('❌ Watch error:'), error);
                }
            }
        }
    }
    catch (error) {
        console.error(chalk.red('❌ Error:'), error);
        process.exit(1);
    }
});
program.parse(process.argv);
function getGenerateQuestions(options) {
    throw new Error('Function not implemented.');
}
